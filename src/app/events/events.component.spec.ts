import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import 'rxjs/Rx';

import { EventsComponent } from './events.component';
import { FacebookService } from '../services/facebook/facebook.service';

import { MockEvents } from './events.mock';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let de: DebugElement;
  let facebookService: FacebookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      imports: [ HttpModule ],
      providers: [ FacebookService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    facebookService = TestBed.get(FacebookService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate the facebook service', () => {
    expect(facebookService).toBeTruthy();
  });

  it('should have all events if there are events', async(() => {
    spyOn(facebookService, 'getEvents')
      .and.returnValue(Observable.of(MockEvents));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.events.length).toEqual(MockEvents.length);
    });
  }));

  it('should show message when there are no events', async(() => {
    
    spyOn(facebookService, 'getEvents')
      .and.returnValue(Observable.of(null));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const message = de.query(By.css('.message')).nativeElement;

      expect(component.events.length).toEqual(0);
    });
  }));
});
