import { Component, Input } from '@angular/core';
import { ICompetition } from '../../../../../core/interfaces/competition.interface';
import { getCurrentCompetition } from '../../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { Store, select } from '@ngrx/store';
import { IAthAndParticipant } from '../../../../../core/viewInterfaces/ath-and-participant.interface';
import { IFirstRoundViewRow } from '../../../../../core/viewInterfaces/first-round/first-round-view-row.interface';
import { IFirstRoundView } from '../../../../../core/viewInterfaces/first-round/first-round-view.interface';
import { IAthAndGroupInitial } from '../../../../../core/viewInterfaces/first-round/ath-and-group-initial.interface';
import { constructAthAndGroupInitials } from '../../../../../core/utils/first-round/construct-ath-and-group-initial';
import { constructFirstRoundViewRow } from '../../../../../core/utils/first-round/construct-first-round-view-row';
import { constructFirstRoundViews } from '../../../../../core/utils/first-round/construct-first-round-view.interface';
import * as AOS from 'aos';

@Component({
  selector: 'app-up-down',
  templateUrl: './up-down.component.html',
  styleUrls: ['./up-down.component.scss']
})
export class UpDownComponent {
  currentCompetition: ICompetition | null = null;
  totalAthList: IAthAndParticipant[] = [];
  firstRoundRows: IFirstRoundViewRow[] = [];
  firstRoundViews: IFirstRoundView[] = [];
  athAndGroupInitials: IAthAndGroupInitial[] = [];
  isLoaded: boolean = false;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    AOS.init();
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.totalAthList = [];
        this.initializeAthList();

        if (this.currentCompetition) {
          this.zeroArrays();
          this.athAndGroupInitials = constructAthAndGroupInitials(this.currentCompetition);

          for (let ath of this.athAndGroupInitials) {
            this.firstRoundRows.push(constructFirstRoundViewRow(this.currentCompetition, ath, this.athAndGroupInitials));
          }

          this.firstRoundViews = constructFirstRoundViews(this.currentCompetition, this.firstRoundRows);
          this.isLoaded = true;
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
