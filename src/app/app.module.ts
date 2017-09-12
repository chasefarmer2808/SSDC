import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EventsComponent,
    ContactComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
