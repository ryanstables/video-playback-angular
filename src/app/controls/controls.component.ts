import { Component, OnInit } from '@angular/core';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {

  constructor(
    public transport: TransportService
  ) { }

  togglePlay(): void {
    if (this.transport.playing$.getValue()) {
      this.transport.stop();
    } else {
      this.transport.start();
    }
  }
  
}
