import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { to64decode } from 'src/app/helpers/base64';
import { IMission } from 'src/app/interfaces/mission/IMission';
import { IRocket } from 'src/app/interfaces/rocket/IRocket';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MissionsService } from 'src/app/services/missions/missions.service';
import { RocketsService } from 'src/app/services/rockets/rockets.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-form-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class FormMissionsComponent {
  @Input() type!: string; 
  @Input() parameters!: IMission;
  @Output() typeFormEmit: EventEmitter<void> = new EventEmitter<void>();

  item!: IMission;
  backupItem!: IMission
  rocketArray!: IRocket[]
  searchRocket: string = ''
  me: any
  isEdit: boolean = false
  isDelete: boolean = false

  constructor(
    private rocketsService: RocketsService,
    public sharedAlert: AlertService,
    private cookieService: CookieService,
    private missionsService: MissionsService,
    private router: Router,
    private datePipe: DatePipe
  ){
    this.item = {
      email_creator: '',
      name_rocket: '',
      name: '',
      place: 0 ,
      image_rocket: '',
      departure_date: '',
      return_date: '',
      route: '',
      created_at: '',
      updated_at: ''
    }  
  }

  async ngOnInit(){
    await this.getRockets()
    this.me = to64decode(this.cookieService.get('me'))
    this.item.email_creator = this.me.email

    if(this.parameters){
      this.item = {...this.parameters}
      this.backupItem = {...this.parameters}
    }
  }
  
  getRocketImage(): string{
    return `data:image/png;base64, ${atob(this.item.image_rocket)}`
  }

  async getRockets(){
    this.rocketsService.getRockets()
      .subscribe(
        data => {
          this.rocketArray = data;
        },
        error => {
          console.error("Error fetching rockets", error);
        }
      );
  }

  choseTypeForm(){
    this.typeFormEmit.emit()
  }

  choseItemSelect(type: string, value: IRocket){
    switch (type) {
      case 'rocket':
        this.item.name_rocket = value.name;
        this.item.image_rocket = value.image
        break;
      default:
        break;
    }
  }

  formatDate(event: any, slug: string) {
    const input = event.target;
    let formattedValue = input.value.replace(/\D/g, "");

    const maxLength = 8;
    if (formattedValue.length > maxLength) {
      formattedValue = formattedValue.substr(0, maxLength); 
    }

    const month = formattedValue.substr(0, 2);
    const day = formattedValue.substr(2, 2); 
    const year = formattedValue.substr(4, 4); 

    let formattedDate = "";

    if (month) {
      formattedDate += month;
    }

    if (day) {
      formattedDate +=  `/${day}`;
    }

    if (year) {
      formattedDate += `/${year}`;
    }

    input.value = formattedDate;    
  }

  getDisplayedButton(type: string = ''): boolean{
    switch (type) {
      case 'save':
        return this.type == 'create' || this.isEdit      
      case 'edit':
        return this.type == 'edit' || this.type == 'view'
      case 'delete':
        return this.type == 'edit'
      default:
        return false;
    }
  }

  saveMission(){
    if(this.item.name_rocket == '' ||
    this.item.name == '' ||
    this.item.image_rocket == '' ||
    this.item.departure_date == '' ||
    this.item.return_date == '' ||
    this.item.route == ''){
      this.sharedAlert.addAlert({uuid: v4(), type: 'orange', title: 'Fill in all fields'})
      return
    }else{
      if(this.item.place == 0){
        this.sharedAlert.addAlert({uuid: v4(), type: 'orange', title: 'The place cannot be zero'})
        return
      }
    }
    delete this.item.image_rocket

    const formattedData = {
      ...this.item,
      departure_date: moment(this.item.departure_date).format('YYYY-MM-DD'),
      return_date: moment(this.item.return_date).format('YYYY-MM-DD')
    };


    if(this.type == 'create'){
     this.createMission(formattedData)
    }else{
      this.updateMission(formattedData)
    } 
  }

  createMission(formattedData: any){
    this.missionsService.createMission(formattedData)
    .subscribe((response: any) => {
      this.sharedAlert.addAlert({uuid: v4(), type: 'success', title: 'Mission successfully registered'});
      this.typeFormEmit.emit()
    }, (error: any) => {
      this.sharedAlert.addAlert({uuid: v4(), type: 'danger', title: 'Error saving data!'})
      console.error('Error saving data:', error);
    });     
  }

  updateMission(formattedData: any){
    this.missionsService.updateMission(formattedData)
    .subscribe((response: any) => {
      this.sharedAlert.addAlert({uuid: v4(), type: 'success', title: 'Mission successfully registered'});
      this.typeFormEmit.emit()
    }, (error: any) => {
      this.sharedAlert.addAlert({uuid: v4(), type: 'danger', title: 'Error saving data!'})
      console.error('Error saving data:', error);
    });     
  }

  edit(){
    this.isEdit = !this.isEdit

    if(!this.isEdit){
      this.item = {...this.backupItem}
      this.type = 'view'
    }else{
      this.type = 'edit'
    }
  }

  getDisabled(): boolean{
    if(this.type == 'create' || (this.type == 'edit' && this.isEdit == true)){
      return false
    }else{
      return true
    }
  }

  getTitle(): string{
    let text = ''

    switch (this.type) {
      case 'view':
        text = 'View mission'
        break;
      case 'edit':
        text = 'Edit mission'
        break;
      case 'create':
        text = 'Create mission'
        break;
      default:
        break;
    }

    return text
  }

  closeModalDelete(){
    this.isDelete = false
    this.typeFormEmit.emit()
  }

  delete(){
    this.isDelete = true
  }
}
