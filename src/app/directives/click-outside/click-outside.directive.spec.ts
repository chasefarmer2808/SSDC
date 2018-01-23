import { ElementRef, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective } from './click-outside.directive';
import { ClickOutsideComponent } from './click-outside.component.mock';

describe('ClickOutsideDirective', () => {

  let component: ClickOutsideComponent;
  let directive: ClickOutsideDirective;
  let fixture: ComponentFixture<ClickOutsideComponent>;
  let directiveElement: DebugElement;
  let wrapperElement: DebugElement;
  let itemElement: DebugElement;
  let outsideElement: DebugElement;
  let clickedOutsideEventSpy: any;

  function triggerDocumentEvent(eventName:string, eventObj:any) {
    let event = new Event(eventName, eventObj);
    document.dispatchEvent(event);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickOutsideComponent, ClickOutsideDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickOutsideComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(ClickOutsideDirective));
    directive = directiveElement.injector.get(ClickOutsideDirective);
    itemElement = fixture.debugElement.query(By.css('.item'));
    outsideElement = fixture.debugElement.query(By.css('.outside'));
    clickedOutsideEventSpy = spyOn(directive.clickedOutside, 'emit');

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveElement).not.toBeNull();
    expect(directive).not.toBeNull();
  });

  it('should detect click outside and call emit', fakeAsync(() => {
    triggerDocumentEvent('click', null);
    tick();
    fixture.detectChanges();
    expect(clickedOutsideEventSpy).toHaveBeenCalled();
  }));

  it('should not emit click outside when clicked inside', () => {
    itemElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(clickedOutsideEventSpy).not.toHaveBeenCalled();
  });
});
