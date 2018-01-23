import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef : ElementRef) { }

  @Output()
  public clickedOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    
    const clickedInside = this._elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.clickedOutside.emit(event);
    }
  }

}
