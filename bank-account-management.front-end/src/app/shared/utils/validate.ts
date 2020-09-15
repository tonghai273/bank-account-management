import { AbstractControl } from '@angular/forms';
import { MyValidationErrors } from './utils';

export const UtilsValidate = {
    isAge(value: number): boolean {
        return value > 0;
    },

    isBalance(value: number): boolean {
        return value >= 0;
    },

    // validate age
    validateAge(control: AbstractControl): MyValidationErrors | null {
        const age = control.value
        return UtilsValidate.isAge(age) ? null : { age: { 'zh-cn': ``, en: `Age must be greater than 0` } };
    },

    // validate balance > 0
    validateBalance(control: AbstractControl): MyValidationErrors | null {
        const balance = control.value
        return UtilsValidate.isBalance(balance) ? null : { age: { 'zh-cn': ``, en: `Balance must be greater than 0` } };
    }
}