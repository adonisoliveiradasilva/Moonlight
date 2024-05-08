import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoginService } from 'src/app/services/login/login.service';
import { CookieService } from "ngx-cookie-service";
import { v4 } from 'uuid';
import { to64encode } from 'src/app/helpers/base64';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isShow: boolean = false; 

  email: string = ''
  password: string = ''
  constructor(private loginService: LoginService, 
    private router: Router, 
    public sharedAlert: AlertService, 
    private cookieService: CookieService,
  ){}

  ngOnInit(){
    if(localStorage.getItem('cachedImage')){
      localStorage.removeItem('cachedImage')
    }

    if(this.cookieService.get('me')){
      this.cookieService.delete('me')
    }
  }

  async login() {
    (await this.loginService.login(this.email, this.password)).subscribe((response) => {
      if(response.body.data){
        localStorage.setItem('cachedImage', response.body.data.image);
        delete response.body.data.image
        this.cookieService.set('me', to64encode(response.body.data))
        this.router.navigate(['/']);
      }
    }, (error: any) => {
      this.sharedAlert.addAlert({uuid: v4(), type: 'orange', title: 'Usuário ou senha incorretos'})
      // console.error('Erro ao fazer login:', error);
    });
  }

} 
