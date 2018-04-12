import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteDataFilterPipe } from '../pipes/route-data-filter/route-data-filter.pipe';
import { RouteGuardFilterPipe } from 'app/pipes/route-guard-filter/route-guard-filter.pipe';
import { AuthService } from 'app/services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { routes } from '../app-routing/app-routes';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let routeDataFileterPipe: RouteDataFilterPipe;
  let routeGuardFilterPipe: RouteGuardFilterPipe;

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
});
