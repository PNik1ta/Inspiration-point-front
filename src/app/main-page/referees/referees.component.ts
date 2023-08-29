import { Component, OnInit } from '@angular/core';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { IParticipantForm } from '../../../core/interfaces/participantForm.interface';

@Component({
  selector: 'app-referees',
  templateUrl: './referees.component.html',
  styleUrls: ['./referees.component.scss']
})
export class RefereesComponent implements OnInit {
  competitionResult: ICompetitionResult | null = null;
  isEmpty: boolean = true;
  totalRefereesInfo: IParticipantForm[] = [];

  ngOnInit(): void {
    const localStorageData = JSON.parse(localStorage.getItem('competitionResult') ?? '');
    this.competitionResult = localStorageData.competitionResult;

    if (this.competitionResult) {
      this.isEmpty = this.competitionResult.refList.length === 0;
    }
    this.initializeRefereesInfo();
  }

  initializeRefereesInfo(): void {
    for(let referee of this.competitionResult!.refList) {
      for(let participant of this.competitionResult!.participantFormList) {
        if (referee.nickname === participant.nickname) {
          this.totalRefereesInfo.push(participant);
          break;
        }
      }
    }
  }
}
