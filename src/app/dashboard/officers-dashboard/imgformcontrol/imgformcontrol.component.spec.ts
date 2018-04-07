import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgFormControlComponent } from './imgformcontrol.component';

describe('ImgformcontrolComponent', () => {
  let component: ImgFormControlComponent;
  let fixture: ComponentFixture<ImgFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
