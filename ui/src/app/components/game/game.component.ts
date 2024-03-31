import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  meteorsArray: any[] = [];
  intervalId: any;
  countSaved = 0;
  countGenerated = 0;
  isGameOver = false;
  positionX = 0;

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'custom-cursor');
  }

  ngOnInit() {
    this.isGameOver = false;
    this.countGenerated = 0;
    this.generateMeteor();
  }

  generateMeteor() {
    if (!this.isGameOver && this.countGenerated < 10) {
      const newMeteor = { left: Math.floor(Math.random() * 100) + 1, width: 20, animated: true };
      this.meteorsArray.push(newMeteor);
      this.countGenerated++;
  
      setTimeout(() => {
        newMeteor.animated = false;
        this.removeMeteor(newMeteor);
      }, 10000);
    }
  }
  
  gameOver() {
    this.isGameOver = true;
    clearInterval(this.intervalId);
  }
  
  restart() {
    clearInterval(this.intervalId);
    this.ngOnInit();
  }
  
  removeMeteor(meteor: any) {
    const index = this.meteorsArray.indexOf(meteor);
    if (index !== -1) {
      this.meteorsArray.splice(index, 1);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.moveLeft();
    } else if (event.key === 'ArrowRight') {
      this.moveRight();
    }
  }

  moveLeft(): void {
    if (this.positionX > 0) { 
      this.positionX -= 50; 
    }
    this.checkCollision();
  }
  
  moveRight(): void {
    const screenWidth = window.innerWidth;
    const divWidth = 150; 
    if (this.positionX + divWidth < screenWidth) { 
      this.positionX += 50;
    } else {
      this.positionX = screenWidth - divWidth;
    }
    this.checkCollision();
  }

  checkCollision(): void {
    const shipLeft = this.positionX;
    const shipRight = shipLeft + 150; // Largura da div "ship"
    const shipBottom = window.innerHeight * 0.85 + 15; // Posição vertical da nave
  
    for (let i = 0; i < this.meteorsArray.length; i++) {
      const meteor = this.meteorsArray[i];
      const meteorLeft = meteor.left * window.innerWidth / 100; // Posição horizontal do meteoro
      const meteorRight = meteorLeft + meteor.width; // Largura do meteoro
      const meteorBottom = window.innerHeight + (meteor.animated ? 15 : 200); // Posição vertical do meteoro a partir do bottom da página
  
      // Verifica se houve colisão horizontal e vertical entre a nave e o meteoro
      if (
        shipRight >= meteorLeft &&
        shipLeft <= meteorRight &&
        shipBottom >= meteorBottom
      ) {
        // Remove o meteoro colidido
        this.removeMeteor(meteor);
  
        // Incrementa o contador de astronautas resgatados
        this.countSaved++;
  
        // Verifica se todos os astronautas foram resgatados
        if (this.countSaved === 10) {
          this.gameOver();
        }
      }
    }
  }
  
  
  
  
  
  
  
  
  
}
