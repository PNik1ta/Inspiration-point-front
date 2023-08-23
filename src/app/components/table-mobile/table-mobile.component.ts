import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table-mobile',
  templateUrl: './table-mobile.component.html',
  styleUrls: ['./table-mobile.component.scss']
})
export class TableMobileComponent implements AfterViewInit {
  @ViewChild('sliderContainer') sliderContainer?: ElementRef;
  @ViewChild('btnPrev') btnPrev?: ElementRef;
  @ViewChild('btnNext') btnNext?: ElementRef;
  @ViewChild('circles') circles?: ElementRef;
  sliderBlocks: HTMLElement[] = [];
  currentIndex: number = 0;

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
}
