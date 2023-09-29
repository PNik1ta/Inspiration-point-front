import { Component, OnInit } from '@angular/core';
import { ICompetition } from '../../../../../core/interfaces/competition.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import * as AOS from 'aos';

@Component({
  selector: 'app-first-round-layout',
  templateUrl: './first-round-layout.component.html',
  styleUrls: ['./first-round-layout.component.scss']
})
export class FirstRoundLayoutComponent implements OnInit {
  currentCompetition: ICompetition | null = null;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    AOS.init();
    this.store.pipe(select(getCurrentCompetition)).subscribe({
      next: (res) => {
        if (res) {
          this.currentCompetition = res;
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
