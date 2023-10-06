import { Component } from '@angular/core';
import { ICompetition } from '../../../../../core/interfaces/competition.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { IAthAndParticipant } from '../../../../../core/viewInterfaces/ath-and-participant.interface';
import { IAthAndGroupInitial } from '../../../../../core/viewInterfaces/first-round/ath-and-group-initial.interface';
import { IFirstRoundViewRow } from '../../../../../core/viewInterfaces/first-round/first-round-view-row.interface';
import { IFirstRoundView } from '../../../../../core/viewInterfaces/first-round/first-round-view.interface';
import { constructAthAndGroupInitials } from '../../../../../core/utils/first-round/construct-ath-and-group-initial';
import { constructFirstRoundViewRow } from '../../../../../core/utils/first-round/construct-first-round-view-row';
import { constructFirstRoundViews } from '../../../../../core/utils/first-round/construct-first-round-view.interface';
import * as AOS from 'aos';

@Component({
  selector: 'app-seeding',
  templateUrl: './seeding.component.html',
  styleUrls: ['./seeding.component.scss']
})
export class SeedingComponent {
  currentCompetition: ICompetition | null = null;
  isEmpty: boolean = true;
  totalAthList: IAthAndParticipant[] = [];
  firstRoundViews: IFirstRoundView[] = [];
  athAndGroupInitials: IAthAndGroupInitial[] = [];
  firstRoundRows: IFirstRoundViewRow[] = [];
  isLoaded: boolean = false;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    AOS.init();
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = this.currentCompetition.athList.length === 0;
        this.totalAthList = [];

        if (this.currentCompetition) {
          this.zeroArrays();
          this.athAndGroupInitials = constructAthAndGroupInitials(this.currentCompetition);
          this.sortByRank();
          this.initializeAthList();


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
    for (let ath of this.athAndGroupInitials) {
      const participant = this.currentCompetition?.participantFormList.find((participant) => participant.nickname === ath.ath.nickname);

      if (participant) {
        let iAthAndParticipant: IAthAndParticipant = { ath: ath.ath, participant, groupInitial: ath.groupInitial }
        this.totalAthList.push(iAthAndParticipant);
      }
    }
  }

  sortByRank(): void {
    this.athAndGroupInitials.sort((a, b) => a.groupInitial.athleteRankPool! - b.groupInitial.athleteRankPool!);
  }

  zeroArrays(): void {
    this.athAndGroupInitials = [];
    this.firstRoundRows = [];
    this.firstRoundViews = [];
  }
}
