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
        MatCardModule
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
        MatCardModule
    ]
})
export class MaterialModule{};