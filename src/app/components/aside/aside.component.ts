import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ICompetition } from '../../../core/interfaces/competition.interface';
import { getCurrentCompetition } from '../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  selectedMenu: string = 'Формула соревнования';
  isOpened: boolean;
  competitions: ICompetition[] = [];
  currentCompetition: ICompetition | null = null;

  constructor(private readonly store: Store, private readonly router: Router) {
    this.isOpened = false;
  }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
      }
    });

    this.router.events
      .subscribe(url => {
        const lastUrlSegment = this.router.url.split('?')[0].split('/').pop();

        switch (lastUrlSegment) {
          case 'General':
            this.selectedMenu = 'Формула соревнования';
            break;
          case 'Starter':
            this.selectedMenu = 'Участники';
            break;
          case 'FirstRound':
            this.selectedMenu = 'Тур групп';
            break;
          case 'Seeding':
            this.selectedMenu = 'Тур прямого выбывания';
            break;
          case 'Results':
            this.selectedMenu = 'Результаты';
            break;
          default:
            break;
        }
      });
  }

  openBurger() {
    this.isOpened = !this.isOpened;
  }

  hideMenu(event: any): void {
    this.isOpened = false;

    if (event.target.classList.contains('disabled')) {
      event.stopPropagation();
    }
  }
}
