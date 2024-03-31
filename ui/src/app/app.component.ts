import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';

  constructor(private renderer: Renderer2) {}

  onMouseEnter(): void {
      this.renderer.addClass(document.body, 'custom-cursor');
  }

  onMouseLeave(): void {
      this.renderer.removeClass(document.body, 'custom-cursor');
  }
}
