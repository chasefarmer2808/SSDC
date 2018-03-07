import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
  let getEventsSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      imports: [ HttpClientModule ],
      providers: [
        FacebookService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    facebookService = de.injector.get(FacebookService);

    getEventsSpy = spyOn(facebookService, 'getEvents')
                    .and.returnValue(Observable.of(MockEvents));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate the facebook service', () => {
    expect(facebookService).toBeTruthy();
  });

  it('should have all events if there are events', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.events.length).toEqual(MockEvents.length);
    });
  }));

  it('should show message when there are no events', async(() => {
    getEventsSpy.and.returnValue(Observable.of([]));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const message = de.query(By.css('.message')).nativeElement;

      expect(component.events.length).toEqual(0);
      expect(message).toBeDefined();
    });
  }));
});
