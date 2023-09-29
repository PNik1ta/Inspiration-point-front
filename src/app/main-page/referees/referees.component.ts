import { Component, OnInit } from '@angular/core';
import { ICompetition } from '../../../core/interfaces/competition.interface';
import { IParticipantForm } from '../../../core/interfaces/participantForm.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../core/reducers/currentCompetition/currentCompetition.selectors';

@Component({
  selector: 'app-referees',
  templateUrl: './referees.component.html',
  styleUrls: ['./referees.component.scss']
})
export class RefereesComponent implements OnInit {
  currentCompetition: ICompetition | null = null;
  isEmpty: boolean = true;
  totalRefereesInfo: IParticipantForm[] = [];

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = this.currentCompetition.refList.length === 0;
      }
    });
    this.initializeRefereesInfo();
  }

  initializeRefereesInfo(): void {
    for (let referee of this.currentCompetition!.refList) {
      for (let participant of this.currentCompetition!.participantFormList) {
        if (referee.nickname === participant.nickname) {
          this.totalRefereesInfo.push(participant);
          break;
        }
      }
    }
  }
}
