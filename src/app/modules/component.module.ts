import { NgModule } from '@angular/core';
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
        ImageDialogComponent
    ]
})
export class ComponentModule{};