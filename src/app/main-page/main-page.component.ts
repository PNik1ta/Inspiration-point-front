import { Component, OnInit } from '@angular/core';
import { ICompetitionResult } from '../../core/interfaces/competition-result.interface';
import { Store, select } from '@ngrx/store';
import { getCompetitionResult } from '../../core/reducers/competitionResult/websocket.selectors';
import { parse } from 'date-fns';
import { getCurrentCompetition } from '../../core/reducers/currentCompetition/currentCompetition.selectors';
import { IInfo } from '../../core/interfaces/info.interface';
import { constructAthList } from '../../core/utils/constrict-ath-list';
import { constructDEParticipantsInfo } from '../../core/utils/direct-elimination/construct-de-participantsInfo';
import { constructDEParticipantsScore } from '../../core/utils/direct-elimination/construct-de-participantsScore';
import { constructDEViews } from '../../core/utils/direct-elimination/construct-de-view';
import { IAthAndParticipant } from '../../core/viewInterfaces/ath-and-participant.interface';
import { IDEView } from '../../core/viewInterfaces/direct-elimination/de-view.interface';
import { IFightDEView } from '../../core/viewInterfaces/direct-elimination/fight-DE-view.interface';

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
      }
    });

    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.constructLastInfos();
        this.zeroArrays();
        this.constructFights();
      }
    });

    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      this.isResultsActive = !!res;
    });
  }

  zeroArrays(): void {
    this.fights = [];
  }

  constructLastInfos(): void {
    if (this.currentCompetition) {
      for (let info of this.currentCompetition.info) {
        if (info.poulTab?.includes('A')) {
          if (this.lastInfos.length === 15) {
            break;
          }
          this.lastInfos.push(info);
        }
      }
    }
  }

  constructFights(): void {
    for (let info of this.lastInfos) {
      let fight: IFightDEView = {
        matchBr: info.fightId ?? 0,
        leftParticipantNickname: info.nicknameLeft,
        rightParticipantNickname: info.nicknameRight,
        leftParticipant: { score: info.scoreLeft ?? 0, region: '', name: '', surname: '' },
        rightParticipant: { score: info.scoreRight ?? 0, region: '', name: '', surname: '' }
      };

      const participantLeft = this.currentCompetition?.participantFormList.find((participant) => participant.nickname === info.nicknameLeft);
      const participantRight = this.currentCompetition?.participantFormList.find((participant) => participant.nickname === info.nicknameRight);

      if (participantLeft) {
        fight.leftParticipant.name = participantLeft.name ?? '';
        fight.leftParticipant.surname = participantLeft.surname ?? '';
        fight.leftParticipant.region = participantLeft.region ?? '';
      }

      if (participantRight) {
        fight.rightParticipant.name = participantRight.name ?? '';
        fight.rightParticipant.surname = participantRight.surname ?? '';
        fight.rightParticipant.region = participantRight.region ?? '';
      }

      this.fights.push(fight);
    }
  }
}
