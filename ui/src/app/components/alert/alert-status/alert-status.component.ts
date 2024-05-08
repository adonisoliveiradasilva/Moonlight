import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-alert-status',
  templateUrl: './alert-status.component.html',
  styleUrls: ['./alert-status.component.scss']
})
export class AlertStatusComponent {
  @Input() title = '';
  @Input() type = '';
  @Input() uuid!: string
  constructor(public sharedAlert: AlertService){}

  removeAlert(){
    this.sharedAlert.removeAlert(this.uuid)
  }
}
