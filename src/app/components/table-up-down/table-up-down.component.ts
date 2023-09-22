import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { IParticipantAndGroup } from '../../../core/viewInterfaces/participant-and-group.interface';

@Component({
  selector: 'app-table-up-down',
  templateUrl: './table-up-down.component.html',
  styleUrls: ['./table-up-down.component.scss']
})
export class TableUpDownComponent implements OnInit, OnChanges {
  @Input('result') result: ICompetitionResult | null = null;
  participantAndGroupList: IParticipantAndGroup[] = [];

  ngOnInit(): void {
    console.log(this.result);

    this.initializeParticipantAndGroupInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['result']) {
      this.participantAndGroupList = [];
      this.initializeParticipantAndGroupInfo();
    }
  }

  initializeParticipantAndGroupInfo(): void {
    for (let group of this.result!.groupsResults) {
      const participant = this.result?.participantFormList.find((participant) => participant.nickname === group.nickname);
      if (participant) {
        let participantAndGroup: IParticipantAndGroup = { participant, group }
        this.participantAndGroupList.push(participantAndGroup);
      }
    }
  }
}
