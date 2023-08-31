import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ICompetitionResult } from '../../../../core/interfaces/competition-result.interface';
import { getCompetitionResult } from '../../../../core/reducers/competitionResult/websocket.selectors';
import { getCurrentCompetition } from '../../../../core/reducers/currentCompetition/currentCompetition.selectors';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {
  currentCompetition: ICompetitionResult | null = null;
  isEmpty: boolean = true;
  competitions: ICompetitionResult[] = [];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = !res.formulae;
      }
    });
  }
}
