import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, of, Subject } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { TransportService } from '../services/transport.service';
import { KeyFrame } from '../types/interfaces';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements AfterViewInit, OnDestroy {

  @ViewChild('track') track!: ElementRef<HTMLElement>;

  progressLength$ = new BehaviorSubject<number>(0);
  keyFrames$ = new BehaviorSubject<KeyFrame[]>([]);
  private destroy$ = new Subject<void>();

  constructor(
    public transport: TransportService,
    public data: DataService
  ) {
  }

  ngAfterViewInit(): void {
    const mapToTrack = (x: number): number => {
      return x * this.track.nativeElement.clientWidth;
    }

    // update the progress bar...
    this.transport.currentTimePercentage$.pipe(
      map(x => {
        if(!x) return 0;
        return mapToTrack(x);
      }),
      takeUntil(this.destroy$)
    ).subscribe(this.progressLength$);

    // wait for the duration to be set before updating the keyFrame positions...
    this.transport.durationChange$.pipe(
      filter(dur => !!dur),
      switchMap(() => fromEvent(window, 'resize').pipe(startWith(null))),
      switchMap(() => of(
        this.data.keyFrames.map(frame => {
          const position = this.transport.timeToProgress(frame.timestamp);
          return {
            ...frame, 
            position: mapToTrack(position)
          };
        })
      ))
    ).subscribe(this.keyFrames$);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
