import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { IMission } from 'src/app/interfaces/mission/IMission';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
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
  
  getMissions(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_PATH}missions`)
      .pipe();
  }

  createMission(missionData: IMission): Observable<any> {
    return this.httpClient.post<any>(`${this.API_PATH}missions`, missionData);
  }

  updateMission(missionData: IMission): Observable<any> {
    return this.httpClient.put<any>(`${this.API_PATH}missions`, missionData);
  }
  
}
