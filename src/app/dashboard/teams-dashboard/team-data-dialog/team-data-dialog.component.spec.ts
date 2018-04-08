import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'app/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TeamsService } from 'app/services/teams/teams.service';

import { StatusMessageComponent } from 'app/status-message/status-message.component';
import { TeamDataDialogComponent } from './team-data-dialog.component';

describe('TeamDataDialogComponent', () => {
  let component: TeamDataDialogComponent;
  let fixture: ComponentFixture<TeamDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDataDialogComponent, StatusMessageComponent ],
      providers: [
        TeamsService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
