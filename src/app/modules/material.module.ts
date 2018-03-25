import { NgModule } from '@angular/core';
import {
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatProgressSpinnerModule, 
    MatButtonToggleModule,
    MatChipsModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        MatInputModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        MatProgressSpinnerModule, 
        MatButtonToggleModule,
        MatDialogModule,
        MatChipsModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatMenuModule,
        MatTableModule,
        MatSelectModule
    ],
    exports: [
        MatInputModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        MatProgressSpinnerModule, 
        MatButtonToggleModule,
        MatDialogModule,
        MatChipsModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatMenuModule,
        MatTableModule,
        MatSelectModule
    ]
})
export class MaterialModule{};