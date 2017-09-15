import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersComponent } from './officers.component';
import { OfficersService } from '../services/officers/officers.service';
import { Officers } from '../services/officers/officers';
import { Officer } from '../services/officers/officer';

describe('OfficersComponent', () => {
  let component: OfficersComponent;
  let fixture: ComponentFixture<OfficersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficersComponent ],
      providers: [ OfficersService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have all officers', () => {
    expect(component.officers.length).toEqual(Officers.length);
  });

  it('should show all officers', () => {
    let officerElements = fixture.nativeElement;
    expect(officerElements.querySelectorAll('.officer').length).toEqual(component.officers.length);
  });
});
