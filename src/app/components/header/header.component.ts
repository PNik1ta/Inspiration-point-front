import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isOpened: boolean;

  constructor() {
    this.isOpened = false;
  }

  openBurger() {
    this.isOpened = !this.isOpened;
  }

  hideMenu(): void {
    this.isOpened = false;
  }
}
