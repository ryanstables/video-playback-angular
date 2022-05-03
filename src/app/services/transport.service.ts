import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportService implements OnDestroy {

  currentTimePercentage$ = new BehaviorSubject<number>(0);
  currentTime$ = new BehaviorSubject<number>(0);
  durationChange$ = new BehaviorSubject<number>(0);
  playing$ = new BehaviorSubject<boolean>(false);

  private stopPlybackTimer$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private video!: HTMLVideoElement;
  
  constructor() {
    // subscribe to the time updates and calculate the progress...
    this.currentTime$.pipe(
      map(time => {
        if(this.video) {return this.timeToProgress(time)}
        return 0;
      }),
      takeUntil(this.destroy$)
    ).subscribe(this.currentTimePercentage$);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  timeToProgress(time: number): number {
    return Math.max(0, Math.min(time / this.video.duration, 100));
  }

  loadVideo(video: HTMLVideoElement): void {
    if(video) {
      this.video = video;

      // start listening when the duration is updated
      // as this gets used in progress-bar calculations...
      fromEvent(video, 'durationchange').pipe(
        map((e: any) => e.target.duration),
        takeUntil(this.destroy$)
      ).subscribe(this.durationChange$);

      // listen for start/stop events on the video element...
      merge(fromEvent(video, 'ended'), fromEvent(video, 'pause')).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.playing$.next(false);
        // this.stopPlybackTimer$.next();
      });
      merge(fromEvent(video, 'play'), fromEvent(video, 'playing')).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => this.playing$.next(true));
    }
  }

  start(): void {
    if(!this.video) {return;}
    this.video.play();
    timer(0, 5).pipe(
      takeUntil(this.stopPlybackTimer$)
    ).subscribe(() => {
      this.currentTime$.next(this.video.currentTime);
    });
  }

  stop(): void {
    if(!this.video) {return;}
    this.video.pause();
    this.stopPlybackTimer$.next();
  }

  scrub(time: number): void {
    if(!this.video) {return;}
    this.video.currentTime = time;
    this.currentTime$.next(this.video.currentTime);
  }

  scrubProportionally(prop: number): void {
    this.scrub(prop * this.video.duration);
  }

  skip(secs: number): void {
    this.scrub(this.video.currentTime + secs);
  }

}
