import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements AfterViewInit {
  @Input('seconds') seconds: number = 30;
  @ViewChild('circle') circle?: ElementRef;
  currentSeconds: number = 0;

  ngAfterViewInit(): void {
    this.startTimer();
    this.circle!.nativeElement.style.animationDuration = 's';
  }

  startTimer(): void {
    this.currentSeconds = this.seconds;
    const timerInterval = setInterval(() => {
      this.currentSeconds--;

      if (this.currentSeconds <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }
}
