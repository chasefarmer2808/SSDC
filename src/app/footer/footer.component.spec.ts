import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteDataFilterPipe } from '../pipes/route-data-filter/route-data-filter.pipe';
import { RouteGuardFilterPipe } from 'app/pipes/route-guard-filter/route-guard-filter.pipe';
import { AuthService } from 'app/services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { routes } from '../app-routing/app-routes';
import * as moment from 'moment';
import { ROLES } from 'app/services/user/roles';
import { DebugElement } from '@angular/core';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let de: DebugElement;
  let routeDataFileterPipe: RouteDataFilterPipe;
  let routeGuardFilterPipe: RouteGuardFilterPipe;
  let authService: AuthService;

  function loginWithRole(role: string) {
    let expiresAt = moment().add('1', 'second');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('role', role);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FooterComponent,
        RouteDataFilterPipe, 
        RouteGuardFilterPipe
      ],
      providers: [ RouteDataFilterPipe, AuthService, HttpClientTestingModule ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();

    routeDataFileterPipe = TestBed.get(RouteDataFilterPipe);
    routeGuardFilterPipe = TestBed.get(RouteDataFilterPipe);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    authService = de.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have imported routes', () => {
    expect(component.myRoutes.length).toEqual(routes.length);
  });

  it('should have populated footer with routes', () => {
    let navLinks = fixture.nativeElement;
    expect(navLinks.querySelectorAll('.nav-map-link').length).toEqual(4);
  });

  it('should not show dashboard link if not logged in', () => {
    let navLinks = de.queryAll(By.css('.nav-map-link'));

    expect(authService.isLoggedIn()).toBeFalsy();
    expect(navLinks.length).toEqual(4);
  });

  it('should not show dashboard link if logged in as user', () => {
    loginWithRole(ROLES.USER);
    fixture.detectChanges();

    let navLinks = de.queryAll(By.css('.nav-map-link'));

    expect(authService.isLoggedIn()).toBeTruthy();
    expect(navLinks.length).toEqual(4);
  });

  it('should show dashboard link if logged in as dev', () => {
    loginWithRole(ROLES.DEV);
    fixture.detectChanges();

    let navLinks = de.queryAll(By.css('.nav-map-link'));

    expect(authService.isLoggedIn()).toBeTruthy();
    expect(navLinks.length).toEqual(5);
  });

  it('should show dashboard link if logged in as admin', () => {
    loginWithRole(ROLES.ADMIN);
    fixture.detectChanges();

    let navLinks = de.queryAll(By.css('.nav-map-link'));

    expect(authService.isLoggedIn()).toBeTruthy();
    expect(navLinks.length).toEqual(5);
  });
});
