import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMission } from 'src/app/interfaces/mission/IMission';
import { IRocket } from 'src/app/interfaces/rocket/IRocket';
import { RocketsService } from 'src/app/services/rockets/rockets.service';

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
  rocketArray!: IRocket[]
  searchRocket: string = ''

  constructor(
    private rocketsService: RocketsService
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
  }
  
  getRocketImage(cachedImage: any): string{
    return `data:image/png;base64, ${atob(cachedImage)}`
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

  choseItemSelect(type: string, value: any){
    switch (type) {
      case 'rocket':
        this.item.name_rocket = value;
        break;
      default:
        break;
    }
  }

  formatDate(event: any) {
    const input = event.target;
    let formattedValue = input.value.replace(/\D/g, "");

    const maxLength = 8;
    if (formattedValue.length > maxLength) {
      formattedValue = formattedValue.substr(0, maxLength); 
    }

    const day = formattedValue.substr(0, 2);
    const month = formattedValue.substr(2, 2); 
    const year = formattedValue.substr(4, 4); 

    let formattedDate = "";

    if (day) {
      formattedDate += day;
    }

    if (month) {
      formattedDate += `/${month}`;
    }

    if (year) {
      formattedDate += `/${year}`;
    }

    input.value = formattedDate;
  }

  getDisplayedButton(type: string = ''): boolean{
    switch (type) {
      case 'save':
        return this.type == 'create'
      default:
        return false;
    }
  }

  saveMission(){
    //fazer verificação de campos: TODOS devem ser preenchidos

  }
}
