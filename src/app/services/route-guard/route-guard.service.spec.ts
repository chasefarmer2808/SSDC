import { TestBed, inject, fakeAsync, async, tick, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/modules/material.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { routes } from '../../app-routing/app-routes';
import { AppComponent } from 'app/app.component';
import { NavbarComponent } from 'app/navbar/navbar.component';
import { HomeComponent } from 'app/home/home.component';
import { EventsComponent } from 'app/events/events.component';
import { ContactComponent } from 'app/contact/contact.component';
import { OfficersComponent } from 'app/officers/officers.component';
import { FooterComponent } from 'app/footer/footer.component';
import { GalleryComponent } from 'app/gallery/gallery.component';
import { GalleryGridComponent } from 'app/gallery/gallery-grid/gallery-grid.component';
import { ImageDialogComponent } from 'app/gallery/gallery-grid/image-dialog/image-dialog.component';
import { TeamsComponent } from 'app/teams/teams.component';
import { LoginComponent } from 'app/login/login.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { UserDashboardComponent } from 'app/dashboard/user-dashboard/user-dashboard.component';
import { OfficersDashboardComponent } from 'app/dashboard/officers-dashboard/officers-dashboard.component';
import { TeamsDashboardComponent } from 'app/dashboard/teams-dashboard/teams-dashboard.component';

import { KeyDirective } from 'app/directives/key/key.directive';
import { ClickOutsideDirective } from 'app/directives/click-outside/click-outside.directive';
import { ScrollInfoDirective } from 'app/directives/onscroll/onscroll.directive';

import { RouteFilterPipe } from 'app/pipes/route-filter/route-filter.pipe';

import { RouteGuardService } from './route-guard.service';
import { AuthService } from '../auth/auth.service';

describe('RouteGuardService', () => {

  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        EventsComponent,
        ContactComponent,
        GalleryComponent,
        TeamsComponent,
        LoginComponent,
        DashboardComponent,
        GalleryGridComponent,
        ImageDialogComponent,
        OfficersComponent,
        AppComponent,
        NavbarComponent,
        FooterComponent,
        UserDashboardComponent,
        OfficersDashboardComponent,
        TeamsDashboardComponent,
        KeyDirective,
        ClickOutsideDirective,
        ScrollInfoDirective,
        RouteFilterPipe
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        Ng2PageScrollModule,
        BrowserAnimationsModule
      ],
      providers: [
        RouteGuardService,
        AuthService
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('should be created', inject([RouteGuardService], (service: RouteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
