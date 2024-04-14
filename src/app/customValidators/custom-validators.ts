import { formatDate } from "@angular/common";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static mobilenumberLengthValidator(control: AbstractControl): ValidationErrors | null {
        const value: string = control.value || '';
        const value1: number = control.value || '';
        let hasLen = (value.length==10)? false:true;
        let valStart = (value1>6000000000)? false:true;
      
        // If the condition is not met, return a validation error
        return (hasLen || valStart) ? { reqLen: true }:null ;
      }
    static NameValidator(chars:string[]):ValidatorFn
     {
      return  (control:AbstractControl):ValidationErrors | null =>{
        const value:string=control.value || '';
        for (let index = 0; index < chars.length; index++) {
          if(value.includes(chars[index]))
          {
            return {invalidChar:true};
          }
        }
        return null;
      }
     }
    static presentDateValidator(control:AbstractControl):ValidationErrors|null {
      if(control.value){
        const dataValue=formatDate(new Date(control.value),'yyyy-MM-dd','en');
      const current_date=formatDate(new Date(),'yyyy-MM-dd','en');
      if(dataValue<current_date){
        console.log((dataValue<current_date),dataValue,current_date);
        return {past:true};
      }
      }
      return null;
    }
    
    static dateIntervalValidator(control:FormGroup):ValidationErrors|null 
    {
      const checkin=control.get('checkinDate')?.value;
      const checkout=control.get('checkoutDate')?.value;
      console.log('out of if date range');
      if(checkin && checkout){
       console.log('in---date range');
      if(formatDate(checkin,'yyyy-MM-dd','en')>formatDate(checkout,'yyyy-MM-dd','en')){
        console.log('in-------------in---date range');
        control.get('checkoutDate')?.setErrors({checkoutLessthanCheckinDate:true});
        return {checkoutLessthanCheckinDate:true};
      }
      }
      return null;
    }
    static datePeriodValidator(control:FormGroup)//:ValidationErrors|null 
    {
      const checkin=control.get('checkinDate')?.value;
      const checkout=control.get('checkoutDate')?.value;
      console.log('out of if date range');
      if(checkin && checkout){
       console.log('in---date range');
      if(formatDate(checkin,'yyyy-MM-dd','en')>formatDate(checkout,'yyyy-MM-dd','en')){
        console.log('in-------------in---date range');
        control.get('checkoutDate')?.setErrors({checkoutLessthanCheckinDate:true});
        //return {checkoutLessthanCheckinDate:true};
      }
      }
      //return null;
    }

    // static dateRangeValidator():ValidatorFn|null{
    //   return (control):ValidationErrors|null =>{
    //   const checkin=control.get('checkinDate')?.value;
    //   const checkout=control.get('checkoutDate')?.value;
    //   console.log('out of if date range');
    //   if(checkin && checkout){
    //    console.log('in---date range');
    //   if(formatDate(checkin,'yyyy-MM-dd','en')>formatDate(checkout,'yyyy-MM-dd','en')){
    //     console.log('in-------------in---date range');
    //     control.get('checkout')?.setErrors({checkoutLessthanCheckinDate:true});
    //     return {checkoutLessthanCheckinDate:true};
    //   }
    //   }
    //   return null;
    // }
  //}
    
}
