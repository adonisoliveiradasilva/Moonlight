import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isShow: boolean = false; 
  isShowGame: boolean = false; 

  count = 0;
  container = document.getElementById('container');
  score = document.getElementById('count');

  constructor(){}

  startGame(){
    this.isShowGame = true
  }

} 
