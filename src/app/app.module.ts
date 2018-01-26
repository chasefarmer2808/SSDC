import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { MaterialModule } from './modules/material.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';

import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { ScrollInfoDirective } from './directives/onscroll/onscroll.directive';
import { OfficersComponent } from './officers/officers.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryGridComponent } from './gallery/gallery-grid/gallery-grid.component';
import { ImageDialogComponent } from './gallery/gallery-grid/image-dialog/image-dialog.component';
import { TeamsComponent } from './teams/teams.component';
import { RouteFilterPipe } from './pipes/route-filter/route-filter.pipe';

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
    FooterComponent,
    GalleryComponent,
    GalleryGridComponent,
    ImageDialogComponent,
    TeamsComponent,
    RouteFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    Ng2PageScrollModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [ ImageDialogComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
