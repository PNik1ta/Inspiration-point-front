import { Component, OnInit } from '@angular/core';
import { ICompetitionResult } from '../../core/interfaces/competition-result.interface';
import { Store, select } from '@ngrx/store';
import { getCompetitionResult } from '../../core/reducers/competitionResult/websocket.selectors';
import { parse } from 'date-fns';
import { getCurrentCompetition } from '../../core/reducers/currentCompetition/currentCompetition.selectors';
import { IInfo } from '../../core/interfaces/info.interface';
import { IFightDEView } from '../../core/viewInterfaces/direct-elimination/fight-DE-view.interface';
import { getRandomNumber } from '../../core/utils/get-random-number';
import { constructFights } from '../../core/utils/construct-fights';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  competitions: ICompetitionResult[] = [];
  isResultsActive: boolean = false;
  currentCompetition: ICompetitionResult | null = null;
  lastInfos: IInfo[] = [];
  fights: IFightDEView[] = [];
  isLastInfosEmpty: boolean = true;
  randomBannerClass: string = '';
  isCompetitionsLoaded: boolean = false;
  isLastFightsLoaded: boolean = false;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(getCompetitionResult)).subscribe((res) => {
      if (res) {
        this.competitions = [...res];

        this.competitions.sort((a: ICompetitionResult, b: ICompetitionResult) => {
          const firstDate = parse(a.newCompetitionForm!.dateTimeCompetitionStart!, 'dd.MM.yyyy', new Date());
          const secondDate = parse(b.newCompetitionForm!.dateTimeCompetitionStart!, 'dd.MM.yyyy', new Date());
          return secondDate.getTime() - firstDate.getTime();
        });
        this.isCompetitionsLoaded = true;
      }
    });

    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.zeroArrays();
        this.constructLastInfos();
        this.fights = constructFights(this.lastInfos, this.currentCompetition);
        this.isLastFightsLoaded = true;
      }
    });

    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      this.isResultsActive = !!res;
    });

    this.randomBannerClass = `banner_${getRandomNumber(1, 3)}`;
  }

  zeroArrays(): void {
    this.fights = [];
    this.lastInfos = [];
  }

  constructLastInfos(): void {
    if (this.currentCompetition) {
      this.isLastInfosEmpty = this.currentCompetition.info.length === 0;
      for (let info of this.currentCompetition.info) {
        if (info.nicknameLeft !== -1 && info.nicknameRight !== -1 &&
          (info.scoreLeft && info.scoreLeft > 0) &&
          (info.scoreRight && info.scoreRight > 0)) {

          if (this.lastInfos.length === 15) {
            break;
          }
          this.lastInfos.push(info);
        }
      }
    }
  }
}
