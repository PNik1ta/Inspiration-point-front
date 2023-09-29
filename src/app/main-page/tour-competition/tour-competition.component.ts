import { Component, Input, OnInit } from '@angular/core';
import { ICompetition } from '../../../core/interfaces/competition.interface';
import { CompetitionTourDate } from '../../../core/enums/competition-tour-date,enum';
import { Store } from '@ngrx/store';
import { CurrentCompetitionReceivedAction } from '../../../core/reducers/currentCompetition/currentCompetition.action';
import { parse } from 'date-fns';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-competition',
  templateUrl: './tour-competition.component.html',
  styleUrls: ['./tour-competition.component.scss']
})
export class TourCompetitionComponent implements OnInit {
  @Input('competition') competition: ICompetition | null;
  competitionTourDate: CompetitionTourDate = CompetitionTourDate.FUTURE;
  buttonContent: string = '';
  isDisabled: boolean = false;

  constructor(
    private readonly store: Store,
    private readonly viewportScroller: ViewportScroller,
    private readonly router: Router
  ) {
    this.competition = null;
  }

  ngOnInit(): void {
    if (!this.competition) {
      return;
    }
    const today = new Date();
    const competitionDate = parse(this.competition.newCompetitionForm.dateTimeCompetitionStart!, 'dd.MM.yyyy', new Date());
    const differenceInTime = today.getTime() - competitionDate.getTime();
    const differenceInDays = Math.trunc(differenceInTime / (1000 * 3600 * 24));


    if (differenceInDays < 0) {
      this.competitionTourDate = CompetitionTourDate.FUTURE;
    } else if (differenceInDays > 0) {
      this.competitionTourDate = CompetitionTourDate.PAST;
      this.buttonContent = 'РЕЗУЛЬТАТЫ';
    } else {
      this.competitionTourDate = CompetitionTourDate.TODAY;
      this.buttonContent = 'ПРОХОДИТ СЕГОДНЯ';
    }
  }

  selectCompetition(competition: ICompetition): void {
    this.store.dispatch(CurrentCompetitionReceivedAction({ data: competition }));
    sessionStorage.setItem('currentCompetition', JSON.stringify(competition));
    this.isDisabled = true;
    this.viewportScroller.scrollToAnchor('results');
    this.router.navigateByUrl('/General');
  }
}
