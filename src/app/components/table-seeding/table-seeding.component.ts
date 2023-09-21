import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IAth } from '../../../core/interfaces/ath.interface';
import { IParticipantForm } from '../../../core/interfaces/participantForm.interface';
import { IAthAndParticipant } from '../../../core/viewInterfaces/ath-and-participant.interface';
import { IParticipantAndGroup } from '../../../core/viewInterfaces/participant-and-group.interface';

@Component({
  selector: 'app-table-seeding',
  templateUrl: './table-seeding.component.html',
  styleUrls: ['./table-seeding.component.scss']
})
export class TableSeedingComponent {
  @Input('hasInfoBlock') hasInfoBlock: boolean = true;
  @Input('athList') athParticipants: IAthAndParticipant[];
  @Input('participantsAndGroups') participantsAndGroups?: IParticipantAndGroup[];

  constructor() {
    this.athParticipants = [];
    this.sortByRanking();
  }

  sortByRanking(): void {
    if (this.participantsAndGroups) {
      this.participantsAndGroups.sort((a, b) => {
        return a.group.rankAfterPools!- b.group.rankAfterPools!
      });
    }
  }
}
