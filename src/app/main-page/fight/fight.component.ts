import { AfterContentChecked, AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFightDEView } from '../../../core/viewInterfaces/direct-elimination/fight-DE-view.interface';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements AfterContentChecked, OnChanges {
  @Input('fight') fight: IFightDEView | null = null;

  ngAfterContentChecked(): void {
    if (this.fight && (this.fight?.leftParticipant.score! < this.fight?.rightParticipant.score!)) {
      const temp = this.fight?.leftParticipant;
      this.fight.leftParticipant = this.fight?.rightParticipant;
      this.fight.rightParticipant = temp;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fight'] && this.fight) {
      if (this.fight?.leftParticipant.score! < this.fight?.rightParticipant.score!) {
        const temp = this.fight?.leftParticipant;
        this.fight.leftParticipant = this.fight?.rightParticipant;
        this.fight.rightParticipant = temp;
      }
    }
  }
}
