import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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
