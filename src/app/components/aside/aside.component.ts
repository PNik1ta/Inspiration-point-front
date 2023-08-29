import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
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
