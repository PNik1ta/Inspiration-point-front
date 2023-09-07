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

        this.isEmpty = this.currentCompetition.athList.length === 0;

        if (this.currentCompetition) {
          this.zeroArrays();
          this.athAndGroupInitials = constructAthAndGroupInitials(this.currentCompetition);

          for (let ath of this.athAndGroupInitials) {
            this.firstRoundRows.push(ConstructFirstRoundViewRow(this.currentCompetition, ath, this.athAndGroupInitials));
          }

          this.firstRoundViews = ConstructFirstRoundViews(this.currentCompetition, this.firstRoundRows);
        }

      }
    });
  }

  zeroArrays(): void {
    this.athAndGroupInitials = [];
    this.firstRoundRows = [];
    this.firstRoundViews = [];
  }
}
