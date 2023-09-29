import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ICompetition } from '../../../core/interfaces/competition.interface';
import { getCurrentCompetition } from '../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { IBracketResultAndParticipant } from '../../../core/viewInterfaces/bracket-result-and-participant.interface';
import { ICompetitionResultAndParticipants } from '../../../core/viewInterfaces/competition-result-and-participant.interface';
import { constructCompetitionResults } from '../../../core/utils/results/construct-competition-results';
import * as AOS from 'aos';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  currentCompetition: ICompetition | null = null;
  isEmpty: boolean = true;
  totalResults: ICompetitionResultAndParticipants[] = [];
  isLoaded: boolean = false;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    AOS.init();
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        console.log(this.currentCompetition);
        this.isEmpty = this.currentCompetition.bracketsResults.length === 0;
        this.totalResults = constructCompetitionResults(this.currentCompetition);
        this.sortByRank(this.totalResults);
        this.isLoaded = true;
      }
    });
  }

  sortByRank(totalResults: IBracketResultAndParticipant[]): void {
    totalResults.sort((a, b) => a.rank - b.rank);
  }
}
