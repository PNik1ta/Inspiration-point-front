import { Component, Input, OnInit } from '@angular/core';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { CompetitionTourDate } from '../../../core/enums/competition-tour-date,enum';
import { Store } from '@ngrx/store';
import { CurrentCompetitionReceivedAction } from '../../../core/reducers/currentCompetition/currentCompetition.action';

@Component({
  selector: 'app-tour-competition',
  templateUrl: './tour-competition.component.html',
  styleUrls: ['./tour-competition.component.scss']
})
export class TourCompetitionComponent implements OnInit {
  @Input('competition') competition: ICompetitionResult | null;
  competitionTourDate: CompetitionTourDate = CompetitionTourDate.FUTURE;
  buttonContent: string = '';

  constructor(private readonly store: Store) {
    this.competition = null;
  }

  ngOnInit(): void {
    if (!this.competition) {
      return;
    }
    const today = new Date();
    const differenceInTime = today.getTime() - new Date(this.competition.newCompetitionForm.dateTimeCompetitionStart ?? '').getTime();
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

  selectCompetition(competition: ICompetitionResult): void {
    this.store.dispatch(CurrentCompetitionReceivedAction({ data: competition }));
    localStorage.setItem('currentCompetition', JSON.stringify(competition));
  }
}
