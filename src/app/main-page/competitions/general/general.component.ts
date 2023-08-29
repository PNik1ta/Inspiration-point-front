import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCompetitionResult } from '../../../../core/reducers/competitionResult/websocket.selectors';
import { ICompetitionResult } from '../../../../core/interfaces/competition-result.interface';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  competitionResult: ICompetitionResult | null = null;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.select(getCompetitionResult).subscribe(data => {
      this.competitionResult = data;
    });
  }
}
