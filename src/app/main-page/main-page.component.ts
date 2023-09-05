import { Component, OnInit } from '@angular/core';
import { ICompetitionResult } from '../../core/interfaces/competition-result.interface';
import { Store, select } from '@ngrx/store';
import { getCompetitionResult } from '../../core/reducers/competitionResult/websocket.selectors';
import { parse } from 'date-fns';
import { getCurrentCompetition } from '../../core/reducers/currentCompetition/currentCompetition.selectors';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  competitions: ICompetitionResult[] = [];
  isResultsActive: boolean = false;
  currentCompetition: ICompetitionResult | null = null;

  constructor(private readonly store: Store) {

  }
  ngOnInit(): void {
    this.store.pipe(select(getCompetitionResult)).subscribe((res) => {
      if (res) {
        this.competitions = [...res];

        this.competitions.sort((a: ICompetitionResult, b: ICompetitionResult) => {
          const firstDate = parse(a.newCompetitionForm!.dateTimeCompetitionStart!, 'dd.MM.yyyy', new Date());
          const secondDate = parse(b.newCompetitionForm!.dateTimeCompetitionStart!, 'dd.MM.yyyy', new Date());

          return secondDate.getTime() - firstDate.getTime();
        });
      }
    });

    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
      }
    });

    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      this.isResultsActive = !!res;
    });
  }
}
