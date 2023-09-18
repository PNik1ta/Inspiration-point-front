import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { getCurrentCompetition } from '../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  selectedMenu: string = 'Формула соревнования';
  isOpened: boolean;
  competitions: ICompetitionResult[] = [];
  currentCompetition: ICompetitionResult | null = null;

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

        if (lastUrlSegment === 'General') {
          this.selectedMenu = 'Формула соревнования';
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
    } else {
      this.selectedMenu = event.srcElement.innerText;
    }
  }
}
