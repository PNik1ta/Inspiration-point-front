import { Component} from '@angular/core';
import { ICompetitionResult } from '../../../../../core/interfaces/competition-result.interface';
import { getCurrentCompetition } from '../../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { Store, select } from '@ngrx/store';
import { GroupResultStatus } from '../../../../../core/enums/group-result-status.enum';
import { constructAthAndGroupInitials } from '../../../../../core/utils/construct-ath-and-group-initial';
import { IAthAndGroupInitial } from '../../../../../core/viewInterfaces/ath-and-group-initial.interface';
import { IFirstRoundView } from '../../../../../core/viewInterfaces/first-round-view.interface';
import { IFirstRoundViewRow } from '../../../../../core/viewInterfaces/first-round-view-row.interface';
import { ConstructFirstRoundViewRow } from '../../../../../core/utils/construct-first-round-view-row';
import { ConstructFirstRoundViews } from '../../../../../core/utils/construct-first-round-view.interface';

@Component({
  selector: 'app-first-round',
  templateUrl: './first-round.component.html',
  styleUrls: ['./first-round.component.scss']
})
export class FirstRoundComponent {
  currentCompetition: ICompetitionResult | null = null;
  athAndGroupInitials: IAthAndGroupInitial[] = []
  firstRoundRows: IFirstRoundViewRow[] = [];
  isEmpty: boolean = true;
  firstRoundViews: IFirstRoundView[] = [];


  constructor(private readonly store: Store) {
    //this.currentCompetition = this.constructMockCompetitionResult();
  }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        console.log(this.currentCompetition);

        this.isEmpty = this.currentCompetition.athList.length === 0;
      }
    });

    if (this.currentCompetition) {
      this.athAndGroupInitials = constructAthAndGroupInitials(this.currentCompetition);

      for (let ath of this.athAndGroupInitials) {
        this.firstRoundRows.push(ConstructFirstRoundViewRow(this.currentCompetition, ath, this.athAndGroupInitials));
      }

      this.firstRoundViews = ConstructFirstRoundViews(this.currentCompetition, this.firstRoundRows);
    }


  }

  constructMockCompetitionResult(): ICompetitionResult {
    const mockCompetitionResult: ICompetitionResult = {
      newCompetitionForm: { competitionId: '' },
      formulae: {},
      refList: [],
      bracketsInitial: [],
      bracketsResults: [],
      groups: [
        { _id: "1", poolNumber: 1, startTime: "01:00", referees: [] },
        { _id: "2", poolNumber: 2, startTime: "02:00", referees: [] },
        { _id: "5", poolNumber: 3, startTime: "05:00", referees: [] },
      ],
      athList: [
        { _id: "1", nickname: 1, startRanking: 1, startPoints: 100, athleteStatus: "Active" },
        { _id: "2", nickname: 2, startRanking: 2, startPoints: 90, athleteStatus: "Inactive" },
        { _id: "3", nickname: 3, startRanking: 3, startPoints: 80, athleteStatus: "Active" },
        { _id: "4", nickname: 4, startRanking: 4, startPoints: 70, athleteStatus: "Inactive" },
        { _id: "5", nickname: 5, startRanking: 5, startPoints: 60, athleteStatus: "Active" },
        { _id: "6", nickname: 6, startRanking: 6, startPoints: 60, athleteStatus: "Active" },
        { _id: "7", nickname: 7, startRanking: 7, startPoints: 10, athleteStatus: "Active" },
        { _id: "8", nickname: 8, startRanking: 8, startPoints: 110, athleteStatus: "Active" },
        { _id: "9", nickname: 9, startRanking: 9, startPoints: 30, athleteStatus: "Inactive" },
        { _id: "10", nickname: 10, startRanking: 10, startPoints: 23, athleteStatus: "Active" },
        { _id: "11", nickname: 11, startRanking: 11, startPoints: 53, athleteStatus: "Active" },
        { _id: "12", nickname: 12, startRanking: 12, startPoints: 12, athleteStatus: "Inactive" },
        { _id: "13", nickname: 13, startRanking: 13, startPoints: 73, athleteStatus: "Active" },
        { _id: "14", nickname: 14, startRanking: 14, startPoints: 86, athleteStatus: "Active" },
        { _id: "15", nickname: 15, startRanking: 15, startPoints: 47, athleteStatus: "Inactive" },
      ],
      participantFormList: [
        { _id: "1", nickname: 1, surname: "Smith", name: "John", fatherName: "Doe", region: "New York" },
        { _id: "2", nickname: 2, surname: "Johnson", name: "Jane", fatherName: "Smith", region: "Los Angeles" },
        { _id: "3", nickname: 3, surname: "Brown", name: "Robert", fatherName: "Davis", region: "Chicago" },
        { _id: "4", nickname: 4, surname: "Williams", name: "Alice", fatherName: "Wilson", region: "Houston" },
        { _id: "5", nickname: 5, surname: "Lee", name: "Michael", fatherName: "Martin", region: "Miami" },
        { _id: "5", nickname: 6, surname: "Jack", name: "Jackson", fatherName: "Martin", region: "Miami" },
        { _id: "5", nickname: 7, surname: "Nick", name: "Nickson", fatherName: "Martin", region: "Miami" },
        { _id: "5", nickname: 8, surname: "Tom", name: "Tomson", fatherName: "Martin", region: "Miami" },
        { _id: "5", nickname: 9, surname: "Jackson", name: "Michael", fatherName: "Martin", region: "Miami" },
        { _id: "5", nickname: 10, surname: "Michaylov", name: "Kirill", fatherName: "Martin", region: "Miami" },
        { _id: "5", nickname: 11, surname: "Petrovna", name: "Margarita", fatherName: "Martin", region: "Miami" },
        { _id: "5", nickname: 12, surname: "Andreevna", name: "Ksenya", fatherName: "Martin", region: "Miami" },
      ],
      groupsInitial: [
        { _id: "1", nickname: 1, poolNumber: 1, athleteRankPool: 1 },
        { _id: "2", nickname: 2, poolNumber: 1, athleteRankPool: 2 },
        { _id: "3", nickname: 3, poolNumber: 1, athleteRankPool: 3 },
        { _id: "4", nickname: 4, poolNumber: 1, athleteRankPool: 4 },
        { _id: "5", nickname: 5, poolNumber: 2, athleteRankPool: 1 },
        { _id: "6", nickname: 6, poolNumber: 2, athleteRankPool: 2 },
        { _id: "7", nickname: 7, poolNumber: 2, athleteRankPool: 3 },
        { _id: "8", nickname: 8, poolNumber: 2, athleteRankPool: 4 },
        { _id: "9", nickname: 9, poolNumber: 3, athleteRankPool: 1 },
        { _id: "10", nickname: 10, poolNumber: 3, athleteRankPool: 2 },
        { _id: "11", nickname: 11, poolNumber: 3, athleteRankPool: 3 },
        { _id: "12", nickname: 12, poolNumber: 3, athleteRankPool: 4 },
      ],
      groupsResults: [
        { _id: "1", nickname: 1, coefficient: 1.5, indicator: 10, status: GroupResultStatus.D, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
        { _id: "2", nickname: 2, coefficient: 1.2, indicator: 8, status: GroupResultStatus.D, rankAfterPools: 2, bouts: 5, wins: 3, td: 4, tr: 6, placeInPool: 2 },
        { _id: "3", nickname: 3, coefficient: 1.6, indicator: 12, status: GroupResultStatus.E, rankAfterPools: 1, bouts: 5, wins: 5, td: 8, tr: 10, placeInPool: 1 },
        { _id: "4", nickname: 4, coefficient: 1.1, indicator: 7, status: GroupResultStatus.Q, rankAfterPools: 2, bouts: 5, wins: 2, td: 3, tr: 5, placeInPool: 2 },
        { _id: "5", nickname: 5, coefficient: 1.4, indicator: 9, status: GroupResultStatus.Q, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
        { _id: "6", nickname: 6, coefficient: 1.4, indicator: 9, status: GroupResultStatus.Q, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
        { _id: "7", nickname: 7, coefficient: 1.4, indicator: 9, status: GroupResultStatus.Q, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
        { _id: "8", nickname: 8, coefficient: 1.4, indicator: 9, status: GroupResultStatus.Q, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
        { _id: "9", nickname: 9, coefficient: 1.4, indicator: 9, status: GroupResultStatus.Q, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
        { _id: "10", nickname: 10, coefficient: 1.4, indicator: 9, status: GroupResultStatus.Q, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
        { _id: "11", nickname: 11, coefficient: 1.4, indicator: 9, status: GroupResultStatus.Q, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
        { _id: "12", nickname: 12, coefficient: 1.4, indicator: 9, status: GroupResultStatus.Q, rankAfterPools: 1, bouts: 5, wins: 4, td: 6, tr: 8, placeInPool: 1 },
      ],
      info: [
        { _id: "1", nicknameRight: 1, currentFightScoreRight: 5, nicknameLeft: 2, currentFightScoreLeft: 3 },
        { _id: "2", nicknameRight: 3, currentFightScoreRight: 4, nicknameLeft: 4, currentFightScoreLeft: 2 },
        { _id: "3", nicknameRight: 5, currentFightScoreRight: 3, nicknameLeft: 7, currentFightScoreLeft: 1 },
        { _id: "4", nicknameRight: 1, currentFightScoreRight: 2, nicknameLeft: 4, currentFightScoreLeft: 1 },
        { _id: "5", nicknameRight: 10, currentFightScoreRight: 3, nicknameLeft: 12, currentFightScoreLeft: 1 },
        { _id: "5", nicknameRight: 2, currentFightScoreRight: 3, nicknameLeft: 1, currentFightScoreLeft: 1 },
        { _id: "5", nicknameRight: 7, currentFightScoreRight: 4, nicknameLeft: 6, currentFightScoreLeft: 10 },
        { _id: "5", nicknameRight: 12, currentFightScoreRight: 3, nicknameLeft: 10, currentFightScoreLeft: 1 },
      ],
    };
    return mockCompetitionResult;
  }
}
