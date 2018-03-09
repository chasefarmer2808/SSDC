import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OfficersComponent } from './officers.component';
import { OfficersService } from '../services/officers/officers.service';
import { OfficersMock } from '../services/officers/officers.mock';
import { Officer } from '../services/officers/officer';

describe('OfficersComponent', () => {
  let component: OfficersComponent;
  let fixture: ComponentFixture<OfficersComponent>;
  let officersService: OfficersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficersComponent ],
      providers: [ OfficersService ],
      imports: [ BrowserAnimationsModule, HttpClientTestingModule ]
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

  it('should call getOfficers on init');

  it('should show all officers', () => {  // needs to be async
    // let officerElements = fixture.nativeElement;
    // expect(officerElements.querySelectorAll('.officer').length).toEqual(component.officers.length);
  });

  it('should toggle the showInfo boolean of an officer');
});
