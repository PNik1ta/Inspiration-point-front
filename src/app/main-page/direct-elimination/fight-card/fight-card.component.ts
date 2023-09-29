import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFightDEView } from '../../../../core/viewInterfaces/direct-elimination/fight-DE-view.interface';

@Component({
  selector: 'app-fight-card',
  templateUrl: './fight-card.component.html',
  styleUrls: ['./fight-card.component.scss'],
})
export class FightCardComponent implements OnChanges, AfterContentChecked {
  @Input('fight') receivedFight: IFightDEView | null = null;
  fight: IFightDEView | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.fight = this.receivedFight;
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fight'] && this.receivedFight) {
      this.fight = this.receivedFight;

      if (this.receivedFight?.leftParticipant.score! < this.receivedFight?.rightParticipant.score!) {
        const temp = this.receivedFight?.leftParticipant;
        this.receivedFight.leftParticipant = this.receivedFight?.rightParticipant;
        this.receivedFight.rightParticipant = temp;
      }
      this.cdr.detectChanges();
    }
  }
}
