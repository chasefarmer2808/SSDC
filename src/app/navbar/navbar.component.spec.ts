import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HttpClientModule } from '@angular/common/http';
import { RouteFilterPipe } from '../pipes/route-filter/route-filter.pipe';

import { routes } from '../app-routing/app-routes';

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
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach((done) => {
    setTimeout(done, 1000);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call populateTeamsSubItems on init', () => {
    let populateTeamsSubItemsSpy = spyOn(component, 'populateTeamsSubItems').and.callThrough();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(populateTeamsSubItemsSpy).toHaveBeenCalled();
    });
  });

  it('should get contact route by path name', () => {
    fixture.detectChanges();
    let trueRoute = routes[1];

    let testRoute = component.getRoute('contact');

    expect(testRoute).toEqual(trueRoute);
  });

  it('should return false for non existant route', () => {
    fixture.detectChanges();
    let testRoute = component.getRoute('does not exist');
    expect(testRoute).toBeFalsy();
  });

  it('should toggle navDropDown boolean', () => {
    fixture.detectChanges();
    expect(component.navDropDown).toBeFalsy();
    component.toggleNav();
    expect(component.navDropDown).toBeTruthy();
  });

  it('should call collapseAll on closeNav call if collapse is true', () => {
    fixture.detectChanges();
    let collapseAllSpy = spyOn(component, 'collapseAll').and.callThrough();

    component.closeNav(true, 'home');

    expect(collapseAllSpy).toHaveBeenCalled();
  });

  it('should not call collapseAll on closeNav call if collapse is false', () => {
    fixture.detectChanges();
    let collapseAllSpy = spyOn(component, 'collapseAll').and.callThrough();

    component.closeNav(false, 'home');

    expect(collapseAllSpy).toHaveBeenCalledTimes(0);
  });

});
