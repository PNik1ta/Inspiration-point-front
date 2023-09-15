import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IFightDEView } from '../../../../core/viewInterfaces/direct-elimination/fight-DE-view.interface';

@Component({
  selector: 'app-fight-card',
  templateUrl: './fight-card.component.html',
  styleUrls: ['./fight-card.component.scss']
})
export class FightCardComponent implements OnChanges, AfterContentChecked {
  @Input('fight') fight: IFightDEView | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    if (this.fight && this.fight?.leftParticipant.score! < this.fight?.rightParticipant.score!) {
      const temp = this.fight?.leftParticipant;
      this.fight.leftParticipant = this.fight?.rightParticipant;
      this.fight.rightParticipant = temp;
    }
    this.cdr.detectChanges();
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
