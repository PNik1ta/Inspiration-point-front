import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ICompetition } from '../../../../core/interfaces/competition.interface';
import { getCurrentCompetition } from '../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import * as AOS from 'aos';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {
  currentCompetition: ICompetition | null = null;
  isEmpty: boolean = true;
  competitions: ICompetition[] = [];

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    AOS.init();
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = !res.formulae;
      }
    });
  }
}
