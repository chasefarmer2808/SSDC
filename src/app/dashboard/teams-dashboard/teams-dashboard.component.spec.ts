import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'app/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { TeamsService } from 'app/services/teams/teams.service';

import { StatusMessageComponent } from 'app/status-message/status-message.component';
import { TeamsDashboardComponent } from './teams-dashboard.component';

describe('TeamsDashboardComponent', () => {
  let component: TeamsDashboardComponent;
  let fixture: ComponentFixture<TeamsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsDashboardComponent, StatusMessageComponent ],
      providers: [ TeamsService ],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
