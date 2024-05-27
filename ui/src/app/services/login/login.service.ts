import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_PATH: any = '';
  
  public httpClient: HttpClient
  private header: any = []
  private requestOptions: any = []

   constructor(
    private HttpClient: HttpClient,
    private router: Router
  ) {
    this.httpClient = HttpClient;
    this.API_PATH = environment.apiUrl;

    this.header['Content-Type'] = 'application/json';
    this.requestOptions = { headers: new HttpHeaders(this.header) };
  }
  
  async login(email: string, password: string): Promise<Observable<any>> {
    const body = { email: email, password: password };
    return this.httpClient.post(`${this.API_PATH}/login`, body, { observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
        
        if (error.status === 401) {
          console.error('Incorrect email or password');
          } else if (error.status === 500) {
          console.error('Internal server error');
          } else {
          console.error('Unknown error');
          }
          return throwError(error);
        })
      );
  }
}
