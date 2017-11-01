import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';
import { EventsComponent } from '../events/events.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let eventsComponent: EventsComponent;
  let eventsFixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent,
                      EventsComponent ],
      imports: [ HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    eventsFixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    eventsComponent = eventsFixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate events component', () => {
    expect(eventsComponent).toBeTruthy();
  });

  it('should show club name in view', () => {
    let clubName = fixture.nativeElement;
    expect(clubName.querySelector('#banner-title').innerHTML).toEqual(component.clubName);
  });

  it('should show club message in view', () => {
    let clubMessage = fixture.nativeElement;
    expect(clubMessage.querySelector('#banner-message').innerHTML).toEqual(component.clubMessage);
  });
});
