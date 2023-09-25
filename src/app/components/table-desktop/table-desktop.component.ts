import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFirstRoundView } from '../../../core/viewInterfaces/first-round/first-round-view.interface';

@Component({
  selector: 'app-table-desktop',
  templateUrl: './table-desktop.component.html',
  styleUrls: ['./table-desktop.component.scss']
})
export class TableDesktopComponent implements OnChanges {
  @Input('firstRoundView') view: IFirstRoundView | null = null;
  arrayOfQuantityParticipants: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['view']) {
      this.arrayOfQuantityParticipants = [];
      this.arrayOfQuantityParticipants = Array.from({ length: this.view?.firstRoundViewRows.length ?? 0 }, (_, index) => index + 1);
      this.sortByAthleteRankPool();
      this.sortByInfoNumber();
    }
  }

  sortByAthleteRankPool(): void {
    this.view?.firstRoundViewRows.sort((a, b) => a.ath.groupInitial.athleteRankPool! - b.ath.groupInitial.athleteRankPool!)
  }

  sortByInfoNumber(): void {
    if (this.view?.firstRoundViewRows) {
      for (let row of this.view?.firstRoundViewRows) {
        const sortedInfoArray = row.infoArray.sort((a, b) => a?.position ?? 0 - b?.position ?? 0);

        const resultArray = [];

        for (let i = 1; i <= this.view.firstRoundViewRows.length; i++) {
          const item = sortedInfoArray.find(info => info?.position === i);
          resultArray.push(item || { position: -1, score: undefined});
        }

        row.infoArray = resultArray;
      }
    }
  }

}
