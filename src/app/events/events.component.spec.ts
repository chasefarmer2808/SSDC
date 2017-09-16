import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

    spyOn(facebookService, 'getEvents')
      .and.returnValue(Observable.of(MockEvents));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
