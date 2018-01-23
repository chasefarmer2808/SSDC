import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[scrollInfo]'
})
export class ScrollInfoDirective {
    constructor(private _elementRef : ElementRef) {}

    @Output()
    showRightArrow: EventEmitter<any> = new EventEmitter();

    @Output()
    hideRightArrow: EventEmitter<any> = new EventEmitter();

    @Output()
    showLeftArrow: EventEmitter<any> = new EventEmitter();

    @Output()
    hideLeftArrow: EventEmitter<any> = new EventEmitter();

    @HostListener('scroll', ['$event.target'])
    public onScroll(targetElement: HTMLElement): void {
        //getting ceiling and floor width to account for desktop and mobile screens
        let yScrollFloor = Math.floor(targetElement.offsetWidth + targetElement.scrollLeft);
        let yScrollCeil = Math.ceil(targetElement.offsetWidth + targetElement.scrollLeft);

        if (yScrollCeil == targetElement.scrollWidth || yScrollFloor == targetElement.scrollWidth) {
            this.hideRightArrow.emit();
        } else {
            this.showRightArrow.emit();
        }

        if (targetElement.scrollLeft == 0) {
            this.hideLeftArrow.emit();
        } else {
            this.showLeftArrow.emit();
        }
    }
}