import { NgModule } from '@angular/core';
import {
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatProgressSpinnerModule, 
    NoConflictStyleCompatibilityMode,
    MatButtonToggleModule,
    MatChipsModule,
    MatCardModule,
    MatToolbarModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        MatInputModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        MatProgressSpinnerModule, 
        NoConflictStyleCompatibilityMode,
        MatButtonToggleModule,
        MatDialogModule,
        MatChipsModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule
    ],
    exports: [
        MatInputModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        MatProgressSpinnerModule, 
        NoConflictStyleCompatibilityMode,
        MatButtonToggleModule,
        MatDialogModule,
        MatChipsModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule
    ]
})
export class MaterialModule{};