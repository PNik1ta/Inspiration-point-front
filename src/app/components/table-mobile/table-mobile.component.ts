import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IAthAndParticipant } from '../../../core/interfaces/ath-and-participant.interface';
import { ICompetitionResult } from '../../../core/interfaces/competition-result.interface';
import { IParticipantAndGroup } from '../../../core/interfaces/participant-and-group.interface';

@Component({
  selector: 'app-table-mobile',
  templateUrl: './table-mobile.component.html',
  styleUrls: ['./table-mobile.component.scss']
})
export class TableMobileComponent implements AfterViewInit, OnInit {
  @Input('athList') athParticipants: IAthAndParticipant[] = [];
  @Input('result') result: ICompetitionResult | null = null;
  participantAndGroupList: IParticipantAndGroup[] = [];

  @ViewChild('sliderContainer') sliderContainer?: ElementRef;
  @ViewChild('btnPrev') btnPrev?: ElementRef;
  @ViewChild('btnNext') btnNext?: ElementRef;
  @ViewChild('circles') circles?: ElementRef;
  sliderBlocks: HTMLElement[] = [];
  currentIndex: number = 0;

  ngOnInit(): void {
    this.initializeParticipantAndGroupInfo();
  }

  initializeParticipantAndGroupInfo(): void {
    for(let group of this.result!.athList) {
      for(let participant of this.result!.participantFormList) {
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
}
