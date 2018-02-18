import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

let keyCodeMap:any = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37
};

@Directive({
  selector: '[appKey]'
})
export class KeyDirective {

  @Output()
  arrowRight: EventEmitter<any> = new EventEmitter();

  @Output()
  arrowLeft: EventEmitter<any> = new EventEmitter();

  constructor() { }

  @HostListener('document:keypress', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    console.log(event);
    this.determineKeyByCode(event.keyCode);
  }

  private determineKeyByCode(code:number) {
    switch (code) {
      case keyCodeMap.ARROW_LEFT: {
        this.arrowLeft.emit();
        break;
      }
      case keyCodeMap.ARROW_RIGHT: {
        this.arrowRight.emit();
        break;
      }
    }
  }

}
