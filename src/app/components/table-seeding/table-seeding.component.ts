import { Component, Input, OnInit } from '@angular/core';
import { IAth } from '../../../core/interfaces/ath.interface';
import { IParticipantForm } from '../../../core/interfaces/participantForm.interface';
import { IAthAndParticipant } from '../../../core/viewInterfaces/ath-and-participant.interface';

@Component({
  selector: 'app-table-seeding',
  templateUrl: './table-seeding.component.html',
  styleUrls: ['./table-seeding.component.scss']
})
export class TableSeedingComponent implements OnInit {
  @Input('hasInfoBlock') hasInfoBlock: boolean = true;
  @Input('athList') athParticipants: IAthAndParticipant[];

  constructor() {
    this.athParticipants = [];
  }

  ngOnInit(): void {
  }
}
