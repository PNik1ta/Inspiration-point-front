import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { getCurrentCompetition } from '../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { IBracketResultAndParticipant } from '../../../core/viewInterfaces/bracket-result-and-participant.interface';
import { constructBracketResults } from '../../../core/utils/results/construct-bracket-results';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  currentCompetition: ICompetitionResult | null = null;
  isEmpty: boolean = true;
  totalResults: IBracketResultAndParticipant[] = [];
  isLoaded: boolean = false;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {

    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = this.currentCompetition.bracketsResults.length === 0;
        this.totalResults = constructBracketResults(this.currentCompetition);
        this.sortByRank(this.totalResults);
        this.isLoaded = true;
      }
    });
  }

  sortByRank(totalResults: IBracketResultAndParticipant[]): void {
    totalResults.sort((a, b) => a.rank - b.rank);
  }
}
