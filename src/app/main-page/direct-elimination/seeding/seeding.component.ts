import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IAthAndParticipant } from '../../../../core/viewInterfaces/ath-and-participant.interface';
import { ICompetitionResult } from '../../../../core/interfaces/competition-result.interface';
import { Store, select } from '@ngrx/store';
import { getCurrentCompetition } from '../../../../core/reducers/currentCompetition/currentCompetition.selectors';
import { IDEView } from '../../../../core/viewInterfaces/direct-elimination/de-view.interface';
import { constructDEParticipantsInfo } from '../../../../core/utils/direct-elimination/construct-de-participantsInfo';
import { constructDEParticipantsScore } from '../../../../core/utils/direct-elimination/construct-de-participantsScore';
import { constructDEViews } from '../../../../core/utils/direct-elimination/construct-de-view';
import { constructAthList } from '../../../../core/utils/constrict-ath-list';

@Component({
  selector: 'app-seeding',
  templateUrl: './seeding.component.html',
  styleUrls: ['./seeding.component.scss']
})
export class SeedingComponent implements AfterViewInit, OnInit {
  @ViewChild('sliderContainer') sliderContainer?: ElementRef;
  @ViewChild('btnPrev') btnPrev?: ElementRef;
  @ViewChild('btnNext') btnNext?: ElementRef;
  @ViewChild('circles') circles?: ElementRef;
  sliderBlocks: HTMLElement[] = [];
  currentIndex: number = 0;
  totalAthList: IAthAndParticipant[] = [];
  currentCompetition: ICompetitionResult | null = null;
  views: IDEView[] = [];

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentCompetition)).subscribe((res) => {
      if (res) {
        this.currentCompetition = res;
        this.zeroArrays();
        this.totalAthList = constructAthList(this.currentCompetition);

        this.views = constructDEViews(this.currentCompetition.bracketsInitial!);

        for (let view of this.views) {
          view = constructDEParticipantsScore(view, this.currentCompetition.info);
        }

        for (let view of this.views) {
          view = constructDEParticipantsInfo(view, this.currentCompetition);
        }
      }
    });
  }

  zeroArrays(): void {
    this.views = [];
  }

  ngAfterViewInit(): void {
    this.sliderBlocks = this.sliderContainer!.nativeElement.getElementsByClassName('slide');
    this.updateVisibleNumbers();
  }

  updateSliderPosition() {
    const offset = this.currentIndex * -100;
    this.sliderContainer!.nativeElement.style.transform = `translateX(${offset}%)`;
    this.removeCircleActiveClasses();
    this.circles!.nativeElement.children[this.currentIndex].classList.add('number_active');
    this.updateVisibleNumbers();
  }

  updateVisibleNumbers() {
    const circleElements = this.circles!.nativeElement.children;
    const visibleCount = 4; // Number of visible numbers
    const middleIndex = Math.floor(visibleCount / 2);

    const startIndex = Math.max(0, this.currentIndex - middleIndex);
    const endIndex = Math.min(this.sliderBlocks.length - 1, startIndex + visibleCount - 1);

    const step = 100 / (visibleCount - 1); // Step for translateX
    const initialTranslate = 50 - step * middleIndex; // Initial translateX value

    for (let i = 0; i < circleElements.length; i++) {
      const circle = circleElements[i] as HTMLElement;

      if (i >= startIndex && i <= endIndex) {
        const distanceFromMiddle = i - this.currentIndex + middleIndex;
        const translateX = initialTranslate + step * distanceFromMiddle;

        circle.style.left = `${translateX}%`;
        circle.style.right = `-${translateX}%`;
        circle.style.opacity = '1';
      } else {
        circle.style.opacity = '0';
      }

      const slideIndex = i - startIndex;
      const slide = this.sliderBlocks[slideIndex];

      if (slide) {
        slide.style.height = i === this.currentIndex ? 'auto' : '0';
        slide.style.width = i === this.currentIndex ? 'auto' : '0';
      }
    }
  }

  removeCircleActiveClasses(): void {
    for (let i = 0; i < this.circles!.nativeElement.children.length; i++) {
      if (this.circles!.nativeElement.children[i].classList.contains('number_active')) {
        this.circles!.nativeElement.children[i].classList.remove('number_active');
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
}
