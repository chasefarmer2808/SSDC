import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteFilterPipe } from '../pipes/route-filter/route-filter.pipe';

import { routes } from '../app-routing/app-routes';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent, RouteFilterPipe ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
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
    expect(navLinks.querySelectorAll('.nav-map-link').length).toEqual(component.myRoutes.length);
  });
});
