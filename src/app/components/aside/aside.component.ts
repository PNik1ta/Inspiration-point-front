import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { getCurrentCompetition } from '../../../core/reducers/currentCompetition/currentCompetition.selectors';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  isOpened: boolean;
  competitions: ICompetitionResult[] = [];
  currentCompetition: ICompetitionResult | null = null;

  constructor(private readonly store: Store) {
    this.isOpened = false;
  }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
      }
    });
  }

  openBurger() {
    this.isOpened = !this.isOpened;
  }

  hideMenu(): void {
    this.isOpened = false;
  }
}
