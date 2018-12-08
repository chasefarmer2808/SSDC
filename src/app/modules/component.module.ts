import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'app/app-routing/app-routing.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { MaterialModule } from 'app/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from 'app/navbar/navbar.component';
import { HomeComponent } from 'app/home/home.component';
import { EventsComponent } from 'app/events/events.component';
import { ContactComponent } from 'app/contact/contact.component';
import { FooterComponent } from 'app/footer/footer.component';
import { GalleryComponent } from 'app/gallery/gallery.component';
import { GalleryGridComponent } from 'app/gallery/gallery-grid/gallery-grid.component';
import { ImageDialogComponent } from 'app/gallery/gallery-grid/image-dialog/image-dialog.component';
import { TeamsComponent } from 'app/teams/teams.component';
import { LoginComponent } from 'app/login/login.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { OfficersComponent } from 'app/officers/officers.component';
import { KeyComponent } from 'app/directives/key/key.component.mock';
import { ClickOutsideComponent } from 'app/directives/click-outside/click-outside.component.mock';

import { RouteGuardFilterPipe } from 'app/pipes/route-guard-filter/route-guard-filter.pipe';
import { RouteDataFilterPipe } from 'app/pipes/route-data-filter/route-data-filter.pipe';

@NgModule({
    declarations: [
        NavbarComponent,
        HomeComponent,
        EventsComponent,
        ContactComponent,
        NavbarComponent,
        HomeComponent,
        EventsComponent,
        ContactComponent,
        LoginComponent,
        DashboardComponent,
        GalleryComponent,
        TeamsComponent,
        ImageDialogComponent,
        OfficersComponent,
        GalleryGridComponent,
        FooterComponent,
        KeyComponent,
        ClickOutsideComponent,
        RouteDataFilterPipe,
        RouteGuardFilterPipe
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        Ng2PageScrollModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        ImageDialogComponent
    ],
    exports: [
        NavbarComponent,
        HomeComponent,
        EventsComponent,
        ContactComponent,
        NavbarComponent,
        HomeComponent,
        EventsComponent,
        ContactComponent,
        LoginComponent,
        DashboardComponent,
        GalleryComponent,
        TeamsComponent,
        ImageDialogComponent,
        OfficersComponent,
        GalleryGridComponent,
        FooterComponent,
        KeyComponent,
        ClickOutsideComponent,
        RouteDataFilterPipe,
        RouteGuardFilterPipe
    ]
})
export class ComponentModule{};