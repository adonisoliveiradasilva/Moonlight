import { Component } from '@angular/core';
import { AlertService } from './services/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Moonlight';

  constructor(public sharedAlert: AlertService) {}

}
