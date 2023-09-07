import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFightDEView } from '../../../../core/viewInterfaces/direct-elimination/fight-DE-view.interface';

@Component({
  selector: 'app-fight-card',
  templateUrl: './fight-card.component.html',
  styleUrls: ['./fight-card.component.scss']
})
export class FightCardComponent implements AfterViewInit, OnChanges {
  @Input('fight') fight: IFightDEView | null = null;

  ngAfterViewInit(): void {
    if (this.fight && this.fight?.leftRankBr! < this.fight?.rightRankBr!) {
      const temp = this.fight?.leftParticipant;
      this.fight.leftParticipant = this.fight?.rightParticipant;
      this.fight.rightParticipant = temp;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fight'] && this.fight && this.fight?.leftRankBr! < this.fight?.rightRankBr!) {
      const temp = this.fight?.leftParticipant;
      this.fight.leftParticipant = this.fight?.rightParticipant;
      this.fight.rightParticipant = temp;
    }
  }
}
