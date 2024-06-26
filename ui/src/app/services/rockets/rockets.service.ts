import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RocketsService {
  API_PATH: any = '';
  
  public httpClient: HttpClient
  private header: any = []
  private requestOptions: any = []

   constructor(
    private HttpClient: HttpClient,
  ) {
    this.httpClient = HttpClient;
    this.API_PATH = environment.apiUrl;

    this.header['Content-Type'] = 'application/json';
    this.requestOptions = { headers: new HttpHeaders(this.header) };
  }
  
  getRockets(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_PATH}rockets`)
      .pipe();
  }
}
