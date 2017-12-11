import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[scrollInfo]'
})
export class ScrollRightDirective {
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
        let yScroll = Math.ceil(targetElement.offsetWidth + targetElement.scrollLeft);

        if (yScroll != targetElement.scrollWidth) {
            this.showRightArrow.emit();
        } else {
            this.hideRightArrow.emit();
        }

        if (targetElement.scrollLeft == 0) {
            this.hideLeftArrow.emit();
        } else {
            this.showLeftArrow.emit();
        }
    }
}