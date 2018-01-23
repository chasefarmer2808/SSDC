import { ElementRef } from '@angular/core';

import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    let _elementRef: ElementRef;

    const directive = new ClickOutsideDirective(_elementRef);
    expect(directive).toBeTruthy();
  });
});
