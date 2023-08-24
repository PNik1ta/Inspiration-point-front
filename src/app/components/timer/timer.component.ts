import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input('seconds') seconds: number = 30;
  currentSeconds: number = 0;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.currentSeconds = this.seconds;
    const timerInterval = setInterval(() => {
      this.currentSeconds--;

      if (this.currentSeconds < 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }
}
