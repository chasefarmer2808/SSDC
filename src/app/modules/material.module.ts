import { NgModule } from '@angular/core';
import {
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatProgressSpinnerModule, 
    NoConflictStyleCompatibilityMode,
    MatButtonToggleModule
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
    ],
    exports: [
        MatInputModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        MatProgressSpinnerModule, 
        NoConflictStyleCompatibilityMode,
        MatButtonToggleModule,
        MatDialogModule,
    ]
})
export class MaterialModule{};