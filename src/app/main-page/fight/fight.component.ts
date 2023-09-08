import { AfterViewInit, Component, Input } from '@angular/core';
import { IFightDEView } from '../../../core/viewInterfaces/direct-elimination/fight-DE-view.interface';
import { IDEView } from '../../../core/viewInterfaces/direct-elimination/de-view.interface';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent {
  @Input('fight') fight: IFightDEView | null = null;
}
