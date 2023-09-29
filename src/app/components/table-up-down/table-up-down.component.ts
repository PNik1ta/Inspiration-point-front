import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICompetition } from '../../../core/interfaces/competition.interface';
import { IParticipantAndGroup } from '../../../core/viewInterfaces/participant-and-group.interface';

@Component({
  selector: 'app-table-up-down',
  templateUrl: './table-up-down.component.html',
  styleUrls: ['./table-up-down.component.scss']
})
export class TableUpDownComponent implements OnChanges {
  @Input('result') result: ICompetition | null = null;
  participantAndGroupList: IParticipantAndGroup[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['result']) {
      this.participantAndGroupList = [];
      this.initializeParticipantAndGroupInfo();
      this.sortByRank();
    }
  }

  initializeParticipantAndGroupInfo(): void {
    for (let group of this.result!.groupsResults) {
      const participant = this.result?.participantFormList.find((participant) => participant.nickname === group.nickname);
      if (participant) {
        let participantAndGroup: IParticipantAndGroup = { participant, group };
        this.participantAndGroupList.push(participantAndGroup);
      }
    }
  }

  sortByRank(): void {
    this.participantAndGroupList.filter((item) => item.group.rankAfterPools && item.group.rankAfterPools > 0);
    this.participantAndGroupList.sort((a, b) => a.group.rankAfterPools! - b.group.rankAfterPools!);
  }
}
