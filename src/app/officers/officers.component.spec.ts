import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OfficersComponent } from './officers.component';
import { OfficersService } from '../services/officers/officers.service';
import { Officers } from '../services/officers/officers';
import { Officer } from '../services/officers/officer';

describe('OfficersComponent', () => {
  let component: OfficersComponent;
  let fixture: ComponentFixture<OfficersComponent>;
  let officersService: OfficersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficersComponent ],
      providers: [ OfficersService ],
      imports: [ BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    officersService = TestBed.get(OfficersService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate the officers service', () => {
    expect(officersService).toBeTruthy();
  });

  it('should have all officers', () => {
    expect(component.officers.length).toEqual(Officers.length);
  });

  it('should show all officers', () => {
    let officerElements = fixture.nativeElement;
    expect(officerElements.querySelectorAll('.officer').length).toEqual(component.officers.length);
  });
});
