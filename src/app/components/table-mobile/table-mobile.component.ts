import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IAthAndParticipant } from '../../../core/viewInterfaces/ath-and-participant.interface';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { IParticipantAndGroup } from '../../../core/viewInterfaces/participant-and-group.interface';
import { IFirstRoundView } from '../../../core/viewInterfaces/first-round/first-round-view.interface';

@Component({
  selector: 'app-table-mobile',
  templateUrl: './table-mobile.component.html',
  styleUrls: ['./table-mobile.component.scss']
})
export class TableMobileComponent implements AfterViewInit, OnInit, OnChanges {
  @Input('athList') athParticipants: IAthAndParticipant[] = [];
  @Input('result') result: ICompetitionResult | null = null;
  @Input('firstRoundView') view: IFirstRoundView | null = null;
  arrayOfQuantityParticipants: number[] = [];
  participantAndGroupList: IParticipantAndGroup[] = [];

  @ViewChild('sliderContainer') sliderContainer?: ElementRef;
  @ViewChild('btnPrev') btnPrev?: ElementRef;
  @ViewChild('btnNext') btnNext?: ElementRef;
  @ViewChild('circles') circles?: ElementRef;
  sliderBlocks: HTMLElement[] = [];
  currentIndex: number = 0;

  ngOnInit(): void {
    this.arrayOfQuantityParticipants = [];
    this.arrayOfQuantityParticipants = Array.from({ length: this.view?.firstRoundViewRows.length ?? 0 }, (_, index) => index + 1);
    this.sortByAthleteRankPool();
    this.sortByInfoNumber();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      this.arrayOfQuantityParticipants = [];
      this.arrayOfQuantityParticipants = Array.from({ length: this.view?.firstRoundViewRows.length ?? 0 }, (_, index) => index + 1);
      this.sortByAthleteRankPool();
      this.sortByInfoNumber();
    }
  }

  constructArrayOfQuantityParticipants(view: IFirstRoundView): number[] {
    return Array.from({ length: this.view?.firstRoundViewRows.length ?? 0 }, (_, index) => index + 1);
  }

  initializeParticipantAndGroupInfo(): void {
    for (let group of this.result!.athList) {
      for (let participant of this.result!.participantFormList) {
        if (group.nickname === participant.nickname) {
          let participantAndGroup: IParticipantAndGroup = { participant, group }
          this.participantAndGroupList.push(participantAndGroup);
          break;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.sliderBlocks = this.sliderContainer!.nativeElement.getElementsByClassName('slide');
  }

  updateSliderPosition() {
    const offset = this.currentIndex * -100;
    this.sliderContainer!.nativeElement.style.transform = `translateX(${offset}%)`;
    this.removeCircleActiveClasses();
    this.circles!.nativeElement.children[this.currentIndex].classList.add('circle_active');
  }

  removeCircleActiveClasses(): void {
    for (let i = 0; i < this.circles!.nativeElement.children.length; i++) {
      if (this.circles!.nativeElement.children[i].classList.contains('circle_active')) {
        this.circles!.nativeElement.children[i].classList.remove('circle_active');
        break;
      }
    }
  }

  nextSlide(): void {
    if (this.currentIndex >= this.sliderBlocks.length) {
      this.btnNext!.nativeElement.classList.add('disabled');
      return;
    }

    if (this.btnPrev!.nativeElement.classList.contains('disabled')) {
      this.btnPrev!.nativeElement.classList.remove('disabled');
    }
    this.currentIndex = (this.currentIndex + 1) % this.sliderBlocks.length;
    this.updateSliderPosition();

  }

  prevSlide(): void {
    if (this.currentIndex <= 0) {
      this.btnPrev!.nativeElement.classList.add('disabled');
      return;
    }

    if (this.btnNext!.nativeElement.classList.contains('disabled')) {
      this.btnNext!.nativeElement.classList.remove('disabled');
    }
    this.currentIndex = (this.currentIndex - 1 + this.sliderBlocks.length) % this.sliderBlocks.length;
    this.updateSliderPosition();
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
          resultArray.push(item || { position: -1, score: undefined });
        }

        row.infoArray = resultArray;
      }
    }
  }
}
