import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HttpModule } from '@angular/http';
import { RouteFilterPipe } from '../pipes/route-filter/route-filter.pipe';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, RouteFilterPipe ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        Ng2PageScrollModule,
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have imported routes', () => {
    expect(component.myRoutes.length).toBeGreaterThan(0);
  });

  it('should have populated nav bar in view', () => {
    let navLinks = fixture.nativeElement;
    expect(navLinks.querySelectorAll('.nav-link').length).toEqual(component.myRoutes.length);
  });

  it('should call functions to get team route and populate teams', async(() => {
    spyOn(component, 'populateTeamsSubItems');
    spyOn(component, 'getRoute');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.populateTeamsSubItems).toHaveBeenCalled();
      expect(component.getRoute).toHaveBeenCalled();
    });
  }));

});
