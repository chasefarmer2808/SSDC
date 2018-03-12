import { NgModule } from '@angular/core';
import {
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatProgressSpinnerModule, 
    NoConflictStyleCompatibilityMode,
    MatButtonToggleModule,
    MatChipsModule
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
        MatIconModule
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
        MatIconModule
    ]
})
export class MaterialModule{};