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
        MatChipsModule
    ],
    exports: [
        MatInputModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        MatProgressSpinnerModule, 
        NoConflictStyleCompatibilityMode,
        MatButtonToggleModule,
        MatDialogModule,
        MatChipsModule
    ]
})
export class MaterialModule{};