import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TransportService } from '../services/transport.service';

import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;
  let transport: TransportService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show play button when initialised', () => {
    const { debugElement } = fixture;
    expect(debugElement.query(By.css('#play'))).toBeTruthy();
  });

});
