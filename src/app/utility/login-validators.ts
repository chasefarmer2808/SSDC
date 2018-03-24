import { FormControl, Validators } from '@angular/forms';

export class LoginValidators {
    static passwordMatch(input: FormControl) {
        if (!input.parent) {  // wait for form to load
            return null;
        }
    
        let firstPassword = input.parent.value.firstPassword;
        let secondPassword = input.value;
    
        const match = firstPassword === secondPassword;
        return match ? null : { mismatch: true };
    }
}