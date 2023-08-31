import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-second-cols',
  templateUrl: './second-cols.component.html',
  styleUrls: ['./second-cols.component.scss']
})
export class SecondColsComponent implements AfterViewInit {
  @ViewChild('sliderContainer') sliderContainer?: ElementRef;
  @ViewChild('btnPrev') btnPrev?: ElementRef;
  @ViewChild('btnNext') btnNext?: ElementRef;
  @ViewChild('circles') circles?: ElementRef;
  sliderBlocks: HTMLElement[] = [];
  currentIndex: number = 0;

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
