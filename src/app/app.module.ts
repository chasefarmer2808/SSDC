import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/services/auth/auth.interceptor';
import { AppRoutingModule } from 'app/app-routing/app-routing.module';
import { MaterialModule } from 'app/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './modules/component.module';

import { AppComponent } from './app.component';

import { KeyDirective } from './directives/key/key.directive';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { ScrollInfoDirective } from './directives/onscroll/onscroll.directive';

import { TeamsService } from './services/teams/teams.service';
import { OfficersService } from 'app/services/officers/officers.service';
import { AuthService } from './services/auth/auth.service';
import { RouteGuardService } from './services/route-guard/route-guard.service';
import { UserService } from 'app/services/user/user.service';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { OfficersDashboardComponent, OfficerDialog } from './dashboard/officers-dashboard/officers-dashboard.component';
import { TeamsDashboardComponent } from './dashboard/teams-dashboard/teams-dashboard.component';
import { ProfileComponent, ChangePasswordDialog } from './dashboard/user-dashboard/profile/profile.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { ImgFormControlComponent } from './dashboard/officers-dashboard/imgformcontrol/imgformcontrol.component';
import { TeamDataDialogComponent } from './dashboard/teams-dashboard/team-data-dialog/team-data-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickOutsideDirective,
    ScrollInfoDirective,
    KeyDirective,
    UserDashboardComponent,
    OfficersDashboardComponent,
    TeamsDashboardComponent,
    ProfileComponent,
    ChangePasswordDialog,
    OfficerDialog,
    StatusMessageComponent,
    ImgFormControlComponent,
    TeamDataDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ComponentModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ 
    ChangePasswordDialog,
    OfficerDialog,
    TeamDataDialogComponent
  ],
  providers: [
    AuthService,
    RouteGuardService,
    UserService,
    OfficersService,
    TeamsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
