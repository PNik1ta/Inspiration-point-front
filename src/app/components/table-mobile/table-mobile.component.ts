import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { IAthAndParticipant } from '../../../core/viewInterfaces/ath-and-participant.interface';
import { ICompetition } from '../../../core/interfaces/competition.interface';
import { IParticipantAndGroup } from '../../../core/viewInterfaces/participant-and-group.interface';
import { IFirstRoundView } from '../../../core/viewInterfaces/first-round/first-round-view.interface';

@Component({
  selector: 'app-table-mobile',
  templateUrl: './table-mobile.component.html',
  styleUrls: ['./table-mobile.component.scss']
})
export class TableMobileComponent implements AfterViewInit, OnChanges {
  @Input('athList') athParticipants: IAthAndParticipant[] = [];
  @Input('result') result: ICompetition | null = null;
  @Input('firstRoundView') view: IFirstRoundView | null = null;
  arrayOfQuantityParticipants: number[] = [];
  participantAndGroupList: IParticipantAndGroup[] = [];

  @ViewChild('slides') slides?: ElementRef;
  @ViewChild('sliderContainer') sliderContainer?: ElementRef;
  @ViewChild('btnPrev') btnPrev?: ElementRef;
  @ViewChild('btnNext') btnNext?: ElementRef;
  @ViewChild('circles') circles?: ElementRef;
  sliderBlocks: HTMLElement[] = [];
  currentIndex: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      this.zeroArrays();
      this.arrayOfQuantityParticipants = Array.from({ length: this.view?.firstRoundViewRows.length ?? 0 }, (_, index) => index + 1);
      this.sortByAthleteRankPool();
      this.sortByInfoNumber();
      this.sortByRank();
    }
  }

  zeroArrays(): void {
    this.arrayOfQuantityParticipants = [];
    this.participantAndGroupList = [];
  }

  sortByRank(): void {
    this.participantAndGroupList.sort((a, b) => a.group.rankAfterPools! - b.group.rankAfterPools!);
  }

  constructArrayOfQuantityParticipants(view: IFirstRoundView): number[] {
    return Array.from({ length: this.view?.firstRoundViewRows.length ?? 0 }, (_, index) => index + 1);
  }

  adjustSliderHeight(): void {
    const currentSlide = this.sliderBlocks[this.currentIndex];
    const slideChildren = currentSlide.children;
    let maxHeight = 0;

    for (let i = 0; i < slideChildren.length; i++) {
      const childHeight = slideChildren[i].getBoundingClientRect().height;
      if (childHeight > maxHeight) {
        maxHeight = childHeight;
      }
    }

    this.sliderContainer!.nativeElement.style.height = `${maxHeight + 60}px`;
  }

  ngAfterViewInit(): void {
    this.sliderBlocks = this.slides!.nativeElement.getElementsByClassName('slide');
  }

  updateSliderPosition() {
    const offset = this.currentIndex * -100;
    this.slides!.nativeElement.style.transform = `translateX(${offset}%)`;
    this.removeCircleActiveClasses();
    this.circles!.nativeElement.children[this.currentIndex].classList.add('circle_active');
    this.adjustSliderHeight();
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
