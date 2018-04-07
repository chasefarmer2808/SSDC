import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-imgformcontrol',
  templateUrl: './imgformcontrol.component.html',
  styleUrls: [
    './imgformcontrol.component.css',
    '../officers-dashboard.component.css',
    '../../dashboard.component.css',
    '../../../app.component.css'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImgFormControlComponent),
      multi: true
    }
  ]
})
export class ImgFormControlComponent implements ControlValueAccessor {

  dataUri: string;

  constructor() { }

  writeValue(value: string) {
    console.log(value)
    if (value !== undefined) {
      this.dataUri = value;
    }
  }

  registerOnChange() {}

  registerOnTouched() {}

}
