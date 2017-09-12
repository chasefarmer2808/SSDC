import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { OfficersService } from '../services/officers/officers.service';
import { Officers } from '../services/officers/officers';
import { Officer } from '../services/officers/officer';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      providers: [ OfficersService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
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
