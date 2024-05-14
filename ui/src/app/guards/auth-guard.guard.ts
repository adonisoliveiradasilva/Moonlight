import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { to64decode } from '../helpers/base64';
import { jwtDecode } from 'jwt-decode';
import { AlertService } from 'src/app/services/alert/alert.service';
import { v4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    public sharedAlert: AlertService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    try{
      const token = to64decode(this.cookieService.get('me')).token
    
      const decodedToken: any = jwtDecode(token);
      const expirationTimeSeconds: number = decodedToken.exp;
      const expirationDate: Date = new Date(expirationTimeSeconds * 1000); 
      const currentTime: number = Date.now(); 
      
      if(expirationTimeSeconds >= (currentTime / 1000)){
        const type_user = to64decode(this.cookieService.get('me')).type_user
        
        const routeConfig =  route.routeConfig?.path

        if(routeConfig == undefined){
          return false
        }

        if(type_user == 'administrator'){
          if (['your_trips', 'administrators', 'reserve_trips'].includes(routeConfig)) {
            this.sharedAlert.addAlert({uuid: v4(), type: 'orange', title: 'Acesso negado!'})          
            return false;
          }
        }

        if(type_user == 'astronaut'){
          if (['administrators', 'astronauts', 'rockets', 'missions'].includes(routeConfig)) {
            this.sharedAlert.addAlert({uuid: v4(), type: 'orange', title: 'Acesso negado!'})
            return false;
          }
        }

         if(type_user == 'houston'){
          if (['your_trips', 'reserve_trips'].includes(routeConfig)) {
            this.sharedAlert.addAlert({uuid: v4(), type: 'orange', title: 'Acesso negado!'})
            return false;
          }
        }
        return true
      }

      this.sharedAlert.addAlert({uuid: v4(), type: 'orange', title: 'Token expirado!'})
      this.router.navigate(['/login'])
      return false;
    }catch(error){

      this.sharedAlert.addAlert({uuid: v4(), type: 'orange', title: 'Token expirado!'})
      this.router.navigate(['/login'])

      return false
    }
  }
}




