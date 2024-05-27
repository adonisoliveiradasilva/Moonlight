import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MissionsService } from 'src/app/services/missions/missions.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  @Input() type!: string
  @Input() parameters!: any
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    public sharedAlert: AlertService,
    private missionsService: MissionsService,
    private router: Router
  ){}

  exitModal(){
    this.closeModal.emit()
  }

  deleteElement(){
    switch (this.type) {
      case 'mission':
        this.deleteMission()
        break;
      default:
        break;
    }
  }

  deleteMission(){
    this.missionsService.deleteMission(this.parameters.id)
    .subscribe((response: any) => {
      this.sharedAlert.addAlert({uuid: v4(), type: 'success', title: 'Mission successfully deleted'});
      this.router.navigate(['/missions'])
      this.closeModal.emit()
    }, (error: any) => {
      this.sharedAlert.addAlert({uuid: v4(), type: 'danger', title: 'Error saving data!'})
      console.error('Error in request:', error);
    });
  }
}
