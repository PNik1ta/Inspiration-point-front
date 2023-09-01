import { Component, Input } from '@angular/core';
import { IAth } from '../../../core/interfaces/ath.interface';
import { IParticipantForm } from '../../../core/interfaces/participantForm.interface';
import { IAthAndParticipant } from '../../../core/interfaces/ath-and-participant.interface';

@Component({
  selector: 'app-table-seeding',
  templateUrl: './table-seeding.component.html',
  styleUrls: ['./table-seeding.component.scss']
})
export class TableSeedingComponent {
  @Input('hasInfoBlock') hasInfoBlock: boolean = true;
  @Input('athList') athParticipants: IAthAndParticipant[];

  constructor() {
    this.athParticipants = [];
  }
}
