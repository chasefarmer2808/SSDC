import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';
import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { TeamsComponent } from '../teams/teams.component';
import { OfficersComponent } from '../officers/officers.component';
import { EventsComponent } from '../events/events.component';
import { GalleryGridComponent } from '../gallery/gallery-grid/gallery-grid.component';
import { ImageDialogComponent } from '../gallery/gallery-grid/image-dialog/image-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
// import { MatInputModule, MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, NoConflictStyleCompatibilityMode } from '@angular/material';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HttpClientModule } from '@angular/common/http';
import { RouteFilterPipe } from '../pipes/route-filter/route-filter.pipe';

import { routes } from '../app-routing/app-routes';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NavbarComponent, 
        HomeComponent,
        ContactComponent,
        GalleryComponent,
        TeamsComponent,
        OfficersComponent,
        EventsComponent,
        GalleryGridComponent,
        ImageDialogComponent,
        RouteFilterPipe ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        Ng2PageScrollModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    router.initialNavigation();
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
