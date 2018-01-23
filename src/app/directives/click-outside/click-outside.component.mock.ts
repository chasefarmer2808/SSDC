import { Component } from '@angular/core';

import { ClickOutsideDirective } from './click-outside.directive';

@Component({
    template: `
        <div class="wrapper" clickOutside>
            <div class="item"></div>
        </div>
        <div class="outside"></div>
    `
})

export class ClickOutsideComponent {}