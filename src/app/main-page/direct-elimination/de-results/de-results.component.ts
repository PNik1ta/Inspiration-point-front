import { Component, OnInit } from '@angular/core';
import { ICompetition } from '../../../../core/interfaces/competition.interface';
import { IBracketResultAndParticipant } from '../../../../core/viewInterfaces/bracket-result-and-participant.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { constructBracketResults } from '../../../../core/utils/results/construct-bracket-results';
import * as AOS from 'aos';

@Component({
  selector: 'app-de-results',
  templateUrl: './de-results.component.html',
  styleUrls: ['./de-results.component.scss']
})
export class DeResultsComponent implements OnInit {
  currentCompetition: ICompetition | null = null;
  isEmpty: boolean = false;
  deResults: IBracketResultAndParticipant[] = [];
  isLoaded: boolean = false;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    AOS.init();
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;

        this.isEmpty = this.currentCompetition.bracketsResults.length === 0;
        this.deResults = constructBracketResults(this.currentCompetition);
        this.sortByRank(this.deResults);
        this.isLoaded = true;
      }
    });
  }

  sortByRank(totalResults: IBracketResultAndParticipant[]): void {
    totalResults.sort((a, b) => a.rank - b.rank);
  }
}
