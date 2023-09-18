import { Component } from '@angular/core';
import { ICompetitionResult } from '../../../../../core/interfaces/competition-result.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { IAthAndParticipant } from '../../../../../core/viewInterfaces/ath-and-participant.interface';
import { IAthAndGroupInitial } from '../../../../../core/viewInterfaces/first-round/ath-and-group-initial.interface';
import { IFirstRoundViewRow } from '../../../../../core/viewInterfaces/first-round/first-round-view-row.interface';
import { IFirstRoundView } from '../../../../../core/viewInterfaces/first-round/first-round-view.interface';
import { constructAthAndGroupInitials } from '../../../../../core/utils/first-round/construct-ath-and-group-initial';
import { constructFirstRoundViewRow } from '../../../../../core/utils/first-round/construct-first-round-view-row';
import { constructFirstRoundViews } from '../../../../../core/utils/first-round/construct-first-round-view.interface';

@Component({
  selector: 'app-seeding',
  templateUrl: './seeding.component.html',
  styleUrls: ['./seeding.component.scss']
})
export class SeedingComponent {
  currentCompetition: ICompetitionResult | null = null;
  isEmpty: boolean = true;
  totalAthList: IAthAndParticipant[] = [];
  firstRoundViews: IFirstRoundView[] = [];
  athAndGroupInitials: IAthAndGroupInitial[] = [];
  firstRoundRows: IFirstRoundViewRow[] = [];

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = this.currentCompetition.athList.length === 0;
        this.initializeAthList();

        if (this.currentCompetition) {
          this.zeroArrays();
          this.athAndGroupInitials = constructAthAndGroupInitials(this.currentCompetition);

          for (let ath of this.athAndGroupInitials) {
            this.firstRoundRows.push(constructFirstRoundViewRow(this.currentCompetition, ath, this.athAndGroupInitials));
          }

          this.firstRoundViews = constructFirstRoundViews(this.currentCompetition, this.firstRoundRows);
        }
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

  zeroArrays(): void {
    this.athAndGroupInitials = [];
    this.firstRoundRows = [];
    this.firstRoundViews = [];
  }
}
