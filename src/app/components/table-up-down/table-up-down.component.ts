import { Component, Input, OnInit } from '@angular/core';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { IParticipantAndGroup } from '../../../core/interfaces/participant-and-group.interface';

@Component({
  selector: 'app-table-up-down',
  templateUrl: './table-up-down.component.html',
  styleUrls: ['./table-up-down.component.scss']
})
export class TableUpDownComponent implements OnInit {
  @Input('result') result: ICompetitionResult | null = null;
  participantAndGroupList: IParticipantAndGroup[] = [];

  ngOnInit(): void {
    this.initializeParticipantAndGroupInfo();
  }

  initializeParticipantAndGroupInfo(): void {
    for(let group of this.result!.athList) {
      for(let participant of this.result!.participantFormList) {
        if (group.nickname === participant.nickname) {
          let participantAndGroup: IParticipantAndGroup = { participant, group }
          this.participantAndGroupList.push(participantAndGroup);
          break;
        }
      }
    }
  }
}
