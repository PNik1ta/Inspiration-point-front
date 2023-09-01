import { Component, Input } from '@angular/core';
import { ICompetitionResult } from '../../../../../core/interfaces/competition-result.interface';
import { getCurrentCompetition } from '../../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { Store, select } from '@ngrx/store';
import { IAthAndParticipant } from '../../../../../core/interfaces/ath-and-participant.interface';

@Component({
  selector: 'app-up-down',
  templateUrl: './up-down.component.html',
  styleUrls: ['./up-down.component.scss']
})
export class UpDownComponent {
  currentCompetition: ICompetitionResult | null = null;
  totalAthList: IAthAndParticipant[] = [];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.initializeAthList();
      }
    });
  }

  initializeAthList(): void {
    for(let ath of this.currentCompetition!.athList) {
      for(let participant of this.currentCompetition!.participantFormList) {
        if (ath.nickname === participant.nickname) {
          let iAthAndParticipant: IAthAndParticipant = { ath, participant}
          this.totalAthList.push(iAthAndParticipant);
          break;
        }
      }
    }
  }
}
