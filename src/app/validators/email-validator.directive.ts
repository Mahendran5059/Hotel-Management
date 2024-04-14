import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[proEmailValidator]',

  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]

})
export class EmailValidatorDirective implements Validator {
  onChange:any =() =>{};
  value:string="";
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
   this.value = control.value as string;
   console.log(this.onChange);
   if(this.value &&this.value.includes("test")){
    return { inValidEamil: true}
   }
   return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onChange=fn;
    
    
  }

}
