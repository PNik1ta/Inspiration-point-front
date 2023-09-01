import { Component} from '@angular/core';
import { ICompetitionResult } from '../../../../../core/interfaces/competition-result.interface';
import { getCurrentCompetition } from '../../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-first-round',
  templateUrl: './first-round.component.html',
  styleUrls: ['./first-round.component.scss']
})
export class FirstRoundComponent {
  currentCompetition: ICompetitionResult | null = null;
  isEmpty: boolean = true;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.isEmpty = this.currentCompetition.athList.length === 0;
      }
    });
  }
}
