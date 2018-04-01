import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'app/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

import { OfficersService } from 'app/services/officers/officers.service';

import { StatusMessageComponent } from 'app/status-message/status-message.component';
import { OfficersDashboardComponent, AddOfficerDialog } from './officers-dashboard.component';

describe('OfficersDashboardComponent', () => {
  let component: OfficersDashboardComponent;
  let fixture: ComponentFixture<OfficersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficersDashboardComponent, AddOfficerDialog, StatusMessageComponent ],
      providers: [ OfficersService ],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
