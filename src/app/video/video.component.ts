import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements AfterViewInit {

  @ViewChild('myVideo') videoElement!: ElementRef<HTMLVideoElement>;
  buttonText = 'Play';
  showControls = false;
  
  constructor(
    private transport: TransportService,
    public data: DataService
  ) { }

  ngAfterViewInit(): void {
    this.transport.loadVideo(this.videoElement.nativeElement);
  }

}
