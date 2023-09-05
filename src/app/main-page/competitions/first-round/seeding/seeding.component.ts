import { Component } from '@angular/core';
import { ICompetitionResult } from '../../../../../core/interfaces/competition-result.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { IAth } from '../../../../../core/interfaces/ath.interface';
import { IParticipantForm } from '../../../../../core/interfaces/participantForm.interface';
import { IAthAndParticipant } from '../../../../../core/viewInterfaces/ath-and-participant.interface';

@Component({
  selector: 'app-seeding',
  templateUrl: './seeding.component.html',
  styleUrls: ['./seeding.component.scss']
})
export class SeedingComponent {
  currentCompetition: ICompetitionResult | null = null;
  isEmpty: boolean = true;
  totalAthList: IAthAndParticipant[] = [];

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = this.currentCompetition.athList.length === 0;
        this.initializeAthList();
      }
    });
  }

  initializeAthList(): void {
    for (let ath of this.currentCompetition!.athList) {
      for (let participant of this.currentCompetition!.participantFormList) {
        if (ath.nickname === participant.nickname) {
          let iAthAndParticipant: IAthAndParticipant = { ath, participant }
          this.totalAthList.push(iAthAndParticipant);
          break;
        }
      }
    }
  }
}
