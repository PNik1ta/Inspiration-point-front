import { Component, Input } from '@angular/core';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';

@Component({
  selector: 'app-table-desktop',
  templateUrl: './table-desktop.component.html',
  styleUrls: ['./table-desktop.component.scss']
})
export class TableDesktopComponent {
  @Input('result') competitionResult: ICompetitionResult | null = null;
}
