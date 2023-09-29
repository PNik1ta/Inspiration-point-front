import { Component, OnInit } from '@angular/core';
import { ICompetition } from '../../../core/interfaces/competition.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../core/reducers/currentCompetition/currentCompetition.selectors';
import * as AOS from 'aos';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  isEmpty: boolean = false;
  currentCompetition: ICompetition | null = null;
  isLoaded: boolean = false;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = this.currentCompetition.participantFormList.length === 0;
        this.isLoaded = true;
      }
    });
  }
}
