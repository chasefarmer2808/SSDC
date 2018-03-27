import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/services/auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { MaterialModule } from './modules/material.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { OfficersComponent } from './officers/officers.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryGridComponent } from './gallery/gallery-grid/gallery-grid.component';
import { ImageDialogComponent } from './gallery/gallery-grid/image-dialog/image-dialog.component';
import { TeamsComponent } from './teams/teams.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { KeyDirective } from './directives/key/key.directive';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { ScrollInfoDirective } from './directives/onscroll/onscroll.directive';

import { RouteFilterPipe } from './pipes/route-filter/route-filter.pipe';

import { OfficersService } from 'app/services/officers/officers.service';
import { AuthService } from './services/auth/auth.service';
import { RouteGuardService } from './services/route-guard/route-guard.service';
import { UserService } from 'app/services/user/user.service';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { OfficersDashboardComponent } from './dashboard/officers-dashboard/officers-dashboard.component';
import { TeamsDashboardComponent } from './dashboard/teams-dashboard/teams-dashboard.component';
import { ProfileComponent, ChangePasswordDialog } from './dashboard/user-dashboard/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EventsComponent,
    ContactComponent,
    ClickOutsideDirective,
    ScrollInfoDirective,
    OfficersComponent,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EventsComponent,
    ContactComponent,
    RouteFilterPipe,
    KeyDirective,
    LoginComponent,
    DashboardComponent,
    GalleryComponent,
    TeamsComponent,
    ImageDialogComponent,
    FooterComponent,
    GalleryGridComponent,
    UserDashboardComponent,
    OfficersDashboardComponent,
    TeamsDashboardComponent,
    ProfileComponent,
    ChangePasswordDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    Ng2PageScrollModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [ ImageDialogComponent, ChangePasswordDialog ],
  providers: [
    AuthService,
    RouteGuardService,
    UserService,
    OfficersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
