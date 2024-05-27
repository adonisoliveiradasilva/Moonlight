import { Injectable } from '@angular/core';
import { IAlert } from 'src/app/interfaces/alert/IAlert';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  public alertArray: IAlert[] = []

  constructor() {}

  addAlert(alert: IAlert){
    this.alertArray.push({
      uuid: alert.uuid,
      type: alert.type,
      title: alert.title,
      visible: true
    })

    setTimeout(()=> {
      this.removeAlert(alert.uuid)
    }, 3000)
  }

  removeAlert(uuid: string){
    this.alertArray.forEach((alert: IAlert)=> {
      if(alert.uuid == uuid){
        alert.visible = false;
      }
    })
  }
}
