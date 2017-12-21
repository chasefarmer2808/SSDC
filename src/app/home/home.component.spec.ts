import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MockComponent } from 'ng2-mock-component';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent,
                      MockComponent({ selector: 'app-events' }) ],
      imports: [ HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate events component', () => {
    fixture.detectChanges();
    expect(de.query(By.css('app-events'))).toBeDefined();
  });

  it('should show club name in view', () => {
    fixture.detectChanges();
    let clubName = fixture.nativeElement;
    expect(clubName.querySelector('#banner-title').innerHTML).toEqual(component.clubName);
  });

  it('should show club message in view', () => {
    fixture.detectChanges();
    let clubMessage = fixture.nativeElement;
    expect(clubMessage.querySelector('#banner-message').innerHTML).toEqual(component.clubMessage);
  });
});
