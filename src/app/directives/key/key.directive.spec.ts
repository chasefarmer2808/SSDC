import { ElementRef, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { KeyDirective } from './key.directive';
import { KeyComponent } from './key.component.mock';

describe('KeyDirective', () => {

  let component: KeyComponent;
  let directive: KeyDirective;
  let fixture: ComponentFixture<KeyComponent>;
  let directiveElement: DebugElement;
  let arrowLeftSpy: any;
  let arrowRightSpy: any;

  function triggerDocumentEvent(eventName:string, eventObj:any) {
    let event = new Event(eventName, eventObj);
    document.dispatchEvent(event);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyComponent, KeyDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(KeyDirective));
    directive = directiveElement.injector.get(KeyDirective); 
    
    arrowRightSpy = spyOn(directive.arrowRight, 'emit');

    fixture.detectChanges();
  })

  it('should create an instance', () => {
    expect(directiveElement).not.toBeNull();
    expect(directive).not.toBeNull();
  });
});
