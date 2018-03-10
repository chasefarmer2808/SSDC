import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

import { OfficersComponent } from './officers.component';
import { OfficersService } from '../services/officers/officers.service';
import { OfficersMock } from '../services/officers/officers.mock';
import { Officer } from '../services/officers/officer';
import { Observable } from 'rxjs/Observable';

describe('OfficersComponent', () => {
  let component: OfficersComponent;
  let fixture: ComponentFixture<OfficersComponent>;
  let de: DebugElement;
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
    de = fixture.debugElement;
    officersService = de.injector.get(OfficersService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate the officers service', () => {
    expect(officersService).toBeTruthy();
  });

  it('should call service getOfficers on init', () => {
    let getOfficersSpy = spyOn(officersService, 'getOfficers').and.callThrough();

    fixture.detectChanges();

    expect(getOfficersSpy).toHaveBeenCalled();
  });

  it('should show all officers', async(() => {
    let getOfficersSpy = spyOn(officersService, 'getOfficers')
                          .and.returnValue(Observable.of(OfficersMock));
    let officerElements = fixture.nativeElement;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(officerElements.querySelectorAll('.officer').length).toEqual(component.officers.length);
      expect(component.officers).toEqual(OfficersMock);
    });

  }));

  it('should toggle the showInfo boolean of an officer', () => {
    let testOfficer = OfficersMock[0];

    expect(testOfficer.showInfo).toBeFalsy();

    component.toggleOfficerInfo(testOfficer);

    expect(testOfficer.showInfo).toBeTruthy();
  });
});
