import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICompetitionResult } from '../../../../core/interfaces/competition-result.interface';
import { getCompetitionResult } from '../../../../core/reducers/competitionResult/websocket.selectors';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {
  competitionResult: ICompetitionResult | null = null;
  isEmpty: boolean = true;

  ngOnInit(): void {
    const localStorageData = JSON.parse(localStorage.getItem('competitionResult') ?? '');
    this.competitionResult = localStorageData.competitionResult;

    if (this.competitionResult) {
      this.isEmpty = Object.keys(this.competitionResult.formulae).length === 0;
    }
  }
}
