import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { VideoComponent } from './video/video.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        VideoComponent,
        ProgressbarComponent,
        ControlsComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'video-playback'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('video-playback');
  });

});
