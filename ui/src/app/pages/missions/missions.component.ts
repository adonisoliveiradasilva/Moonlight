import { Component } from '@angular/core';
import { to64decode } from 'src/app/helpers/base64';
import { IMission } from 'src/app/interfaces/mission/IMission';
import { MissionsService } from 'src/app/services/missions/missions.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent {
  orderByDesc: boolean = true;
  search: string = ''
  dataSource!: IMission[]
  filteredDataSource!: IMission[]

  itemsPerPage = 5;
  currentPage = 1;

  typeForm = ''

  constructor(private missionsService: MissionsService){
    this.getMissions()
  }

  getFilterName(){
    return this.orderByDesc ? 'Oldest first' : 'Newest first'
  }

  choseFilter(){
    this.orderByDesc = !this.orderByDesc

    if (this.orderByDesc) {
      this.dataSource.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      this.dataSource.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }

  }

  async getMissions(){
    // this.dataSource = [
    //   {
    //     id: 0,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 1",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 1,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 2",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 2,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 3",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 3,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 4",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 0,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 5",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 1,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 6",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 2,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 7",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 3,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 8",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 0,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 9",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 1,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 10",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 2,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 11",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 3,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 12",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 0,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 13",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 1,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 14",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 2,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 15",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   },
    //   {
    //     id: 3,
    //     email_creator: 'houston@nasa.com',
    //     name_rocket: 'Saturn IB',
    //     image_rocket: '',
    //     name: "Apollo 16",
    //     departure_date:  "11 de outubro de 1968",
    //     return_date: "22 de outubro de 1968",
    //     route: "Orbitar a terra",
    //     place: 3,
    //     created_at: '05052000' ,
    //     updated_at: '05052000'
    //   }
    // ]


    this.missionsService.getMissions()
      .subscribe(
        data => {
          this.dataSource = data;
          this.filteredDataSource = this.dataSource
        },
        error => {
          console.error('Error fetching missions:', error);
        }
      );       
  }

  getRocketImage(cachedImage: any): string{
    return `data:image/png;base64, ${atob(cachedImage)}`
  }

  getDisplayedRows(): IMission[]{
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredDataSource?.slice(startIndex, endIndex); 
  }

  searchItems(){
    this.currentPage = 1;
    this.filteredDataSource = this.dataSource.filter((item: IMission) => item.name.toLowerCase().includes(this.search.toLowerCase()))
  }

  choseTypeForm(typeForm: string = ''){
    this.typeForm = typeForm

    switch (typeForm) {
      case 'create':

        break;
    
      default:
        break;
    }
  }
}
