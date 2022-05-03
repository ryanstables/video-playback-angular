import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ControlsComponent } from '../controls/controls.component';
import { ProgressbarComponent } from '../progressbar/progressbar.component';
import { VideoComponent } from './video.component';

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoComponent, ControlsComponent, ProgressbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('The Control panel', () => {

    it('should be rendered and not visible at startup', () => {
      const controlPanel = fixture.debugElement.query(By.css('app-controls'));
      expect(controlPanel.classes['show']).not.toBeDefined();
    });

    it('should appear on mouse-enter', () => {      
      const container = fixture.debugElement.query(By.css('.video-container'));
      const controlPanel = fixture.debugElement.query(By.css('app-controls'));
      container.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();
      expect(controlPanel.classes['show']).toBeDefined();
    });

    it('should disappear on mouse-leave', () => {      
      const container = fixture.debugElement.query(By.css('.video-container'));
      const controlPanel = fixture.debugElement.query(By.css('app-controls'));
      container.triggerEventHandler('mouseleave', null);
      fixture.detectChanges();
      expect(controlPanel.classes['show']).not.toBeDefined();
    });

  });
  
});
