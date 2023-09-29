import { Component, OnInit } from '@angular/core';
import { ICompetition } from '../../../core/interfaces/competition.interface';
import { IDEView } from '../../../core/viewInterfaces/direct-elimination/de-view.interface';
import { IAthAndParticipant } from '../../../core/viewInterfaces/ath-and-participant.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { constructAthList } from '../../../core/utils/constrict-ath-list';
import { constructDEParticipantsInfo } from '../../../core/utils/direct-elimination/construct-de-participantsInfo';
import { constructDEParticipantsScore } from '../../../core/utils/direct-elimination/construct-de-participantsScore';
import { constructDEViews } from '../../../core/utils/direct-elimination/construct-de-view';
import * as AOS from 'aos';

@Component({
  selector: 'app-direct-elimination',
  templateUrl: './direct-elimination.component.html',
  styleUrls: ['./direct-elimination.component.scss']
})
export class DirectEliminationComponent implements OnInit {
  currentCompetition: ICompetition | null = null;
  views: IDEView[] = [];
  viewsForDesktop: IDEView[] = [];
  totalAthList: IAthAndParticipant[] = [];
  isLoaded: boolean = false;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.zeroArrays();
        this.totalAthList = constructAthList(this.currentCompetition);

        this.views = constructDEViews(this.currentCompetition.bracketsInitial);

        for (let view of this.views) {
          view = constructDEParticipantsScore(view, this.currentCompetition.info);
        }

        for (let view of this.views) {
          view = constructDEParticipantsInfo(view, this.currentCompetition);
        }
        this.viewsForDesktop.push(...this.views);

        if (this.viewsForDesktop.length <= 4) {
          this.viewsForDesktop = [];
        } else {
          this.viewsForDesktop = this.viewsForDesktop.slice(this.viewsForDesktop.length - 4);
        }
        this.isLoaded = true;
      }
    });
  }

  zeroArrays(): void {
    this.views = [];
    this.viewsForDesktop = [];
  }
}
