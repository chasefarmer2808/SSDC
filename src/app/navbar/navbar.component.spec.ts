import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';

import { NavbarComponent } from '../navbar/navbar.component';

import { TeamsService } from '../services/teams/teams.service';
import { AuthService } from 'app/services/auth/auth.service';

import { RouteDataFilterPipe } from '../pipes/route-data-filter/route-data-filter.pipe';
import { RouteGuardFilterPipe } from 'app/pipes/route-guard-filter/route-guard-filter.pipe';

import { routes } from '../app-routing/app-routes';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';
import { ROLES } from 'app/services/user/roles';

describe('NavbarComponent', () => {

  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let authService: AuthService;

  function loginWithRole(role: string) {
    let expiresAt = moment().add('20', 'second');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('role', role);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        RouteDataFilterPipe,
        RouteGuardFilterPipe
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        Ng2PageScrollModule,
        BrowserAnimationsModule
      ],
      providers: [ TeamsService, AuthService ]
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    authService = de.injector.get(AuthService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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

  it('should not show dashboard link if not logged in', () => {
    fixture.detectChanges();

    let navLinks = de.queryAll(By.css('.large-nav-link'));

    expect(authService.isLoggedIn()).toBeFalsy();
    expect(navLinks.length).toEqual(4);
  });

  it('should not show dashboard link if logged in as user', () => {
    fixture.detectChanges();

    loginWithRole(ROLES.USER);
    fixture.detectChanges();

    let navLinks = de.queryAll(By.css('.large-nav-link'));

    expect(authService.isLoggedIn()).toBeTruthy();
    expect(navLinks.length).toEqual(4);
  });

  it('should show dashboard link if logged in as dev', () => {
    fixture.detectChanges();

    loginWithRole(ROLES.DEV);
    fixture.detectChanges();

    let navLinks = de.queryAll(By.css('.large-nav-link'));

    expect(authService.isLoggedIn()).toBeTruthy();
    expect(navLinks.length).toEqual(5);
  });

  it('should show dashboard link if logged in as admin', () => {
    fixture.detectChanges();

    loginWithRole(ROLES.ADMIN);
    fixture.detectChanges();

    let navLinks = de.queryAll(By.css('.large-nav-link'));

    expect(authService.isLoggedIn()).toBeTruthy();
    expect(navLinks.length).toEqual(5);
  });
});