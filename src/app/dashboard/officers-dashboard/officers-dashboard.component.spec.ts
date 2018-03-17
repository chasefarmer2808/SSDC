import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersDashboardComponent } from './officers-dashboard.component';

describe('OfficersDashboardComponent', () => {
  let component: OfficersDashboardComponent;
  let fixture: ComponentFixture<OfficersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficersDashboardComponent ]
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
