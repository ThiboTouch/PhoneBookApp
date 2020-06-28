import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validPhoneNumberValidator(phoneNumberRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const valid = phoneNumberRe.test(control.value);
        return valid ? null : {validPhoneNumber: {value: control.value}} ;
    };
}