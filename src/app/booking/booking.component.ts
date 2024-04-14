import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DOCUMENT, formatDate } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PostBookingService } from './post-booking.service';
import { exhaustMap, map, mergeMap, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../customValidators/custom-validators';


@Component({
  selector: 'pro-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
  
})
export class BookingComponent implements OnInit {
BookingForm!:FormGroup;

  constructor(private fb:FormBuilder, private bookingservice:PostBookingService,private route:ActivatedRoute,private routes:Router) { }
  panelOpenState = false;
  passportFlag=false;
  //test=this.BookingForm.get('guestList');
  get guestsList(){
    return this.BookingForm.get('guestsList') as FormArray;
  }
  id$!:string|null;
  chars:string[]=['*','!','@','$','%','^','&','#','(',')','0','1','9','8','{','}','[',']','>','<','/','?','\'','2','3','4','5',':',';','.',',','_','-','6','7','+','=','|','\\','`','~']
  ngOnInit(): void {
    this.route.paramMap.subscribe((data)=>this.id$=data.get('id'))
   this.BookingForm=this.fb.group(
    { //bookingId: new FormControl('',[Validators.required,Validators.email]),
    roomId: [{value:this.id$,disabled:true}],
    guestEmail: ['',[Validators.email]],
    checkinDate: ['',[CustomValidators.presentDateValidator,]],
    checkoutDate: ['',[CustomValidators.presentDateValidator,]],
    bookingStatus: [''],
    bookingAmount: [''],
    bookingDate: [{value:new Date(),disabled:true}],
    mobilenumber: ['',[CustomValidators.mobilenumberLengthValidator]],
    guestName: ['',[CustomValidators.NameValidator(this.chars)]],
    address:this.fb.group({
      guestAddress1: ['',[Validators.minLength(4)]],
      guestAddress2:[''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: ['']
    }),
    guestsList: this.fb.array([
      this.getGuestControls()
    ]),
    
  },
  {updateOn:'blur',Validators:[CustomValidators.dateIntervalValidator]
}
   );
  //  this.BookingForm.addValidators(CustomValidators.dateRangeValidator);
  //  this.BookingForm.updateValueAndValidity();
   this.BookingForm.valueChanges.pipe(
    exhaustMap((data)=> this.bookingservice.postBookings(data))
  ).subscribe((data)=> console.log(data));
  this.BookingForm.get('checkoutDate')?.valueChanges.subscribe(
    (data)=>{
      console.log(" check out status change ---------");
      this.dateRangeValidator();
      
    }
  )
  this.BookingForm.get('checkinDate')?.valueChanges.subscribe(
    (data)=>{
      console.log(" check out status change ---------");
      if(this.BookingForm.get('checkoutDate')?.valid)
      this.dateRangeValidator();
      
    }
  )
  }
  
  addBooking(){
    console.log(this.BookingForm.getRawValue());

    this.routes.navigate(['/rooms'])
    
  }
 

  addGuests(){
    this.guestsList.push(this.getGuestControls());
  }
  getGuestControls(){
  return this.fb.group({guestsName:['',[CustomValidators.NameValidator(this.chars)]], guestsAge:['']});
  }
  removeGuest(i:number){
    if(this.BookingForm.get('guestsList')){
      this.guestsList.removeAt(i);
    }
  }
  actPassport(){

    if(this.passportFlag){
      if(this.BookingForm.get('passportNumber')){
        this.BookingForm.removeControl('passportNumber');
      }
    }
    else{
      this.BookingForm.addControl('passportNumber',new FormControl(''));
    }
    this.passportFlag=!this.passportFlag;
  }
  // addPassport(){
  //   this.BookingForm.addControl('passportNumber',new FormControl(''));
  // }
  // removePassport(){
  //   if(this.BookingForm.get('passportNumber')){
  //     this.BookingForm.removeControl('passportNumber');
  //   }
  // }

//--------------------------------------------CUSTOM VALIDATORS FUNCTIONS-----------------------------------------------------------------------------------------------------
mobilenumberLengthValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  const value1: number = control.value || '';
  let hasUppercase = (value.length==10)? false:true;
  let valStart = (value1>6000000000)? false:true;

  // If the condition is not met, return a validation error
  return (hasUppercase || valStart) ? { reqLen: true }:null ;
}

dateRangeValidator(){
  // const checkin=this.BookingForm.get('checkinDate')?.value;
  // const checkout=this.BookingForm.get('checkoutDate')?.value;
  // console.log('out of if date range');
  // if(checkin && checkout){
  //  console.log('in---date range');
  // if(formatDate(checkin,'yyyy-MM-dd','en')>formatDate(checkout,'yyyy-MM-dd','en')){
  //   console.log('in-------------in---date range');
  //   this.BookingForm.get('checkoutDate')?.setErrors({checkoutLessthanCheckinDate:true});
  //   //return {checkoutLessthanCheckinDate:true};
  // }
  // }
  CustomValidators.datePeriodValidator(this.BookingForm);
}


//--------------------------------------------ERROR MESSAGE FUNCTIONS-----------------------------------------------------------------------------------------------------
  getErrorMessage() {
    if (this.BookingForm.get('bookingId')?.hasError('required')) {
      
      return 'You must enter a value';
    }

    return this.BookingForm.get('bookingId')?.invalid ? 'Not a valid bookongId' : '';
  }
  getErrorGuestName() {
    if (this.BookingForm.get('guestName')?.hasError('required')) {
      
      return 'You must enter a value';
    }

    return this.BookingForm.get('guestName')?.invalid ? (this.BookingForm.get('guestName')?.getError('invalidChar')? 'special characters like @!~*&^%)] and numbers not allowed':'Can\'t less than 4 letters') : '';
  }
  getErrorEmail() {
    // if (this.BookingForm.get('guestEmail')?.hasError('required')) {
      
    //   return 'You must enter a value';
    // }
    if (this.BookingForm.get('guestEmail')?.hasError('required')) {
      //console.log('has error');
      return 'You must enter a value';
    }
    return "not a valid email";
  }
  getErrorMobNum(){
    if (this.BookingForm.get('mobilenumber')?.hasError('required')) {
      
      return 'You must enter a value';
    }

    return this.BookingForm.get('mobilenumber')?.invalid ? 'Not a valid mobile number' : '';
  }
  getErrorAmount() {
    if (this.BookingForm.get('bookingAmount')?.hasError('required')) {
      
      return 'You must enter a value';
    }

    return this.BookingForm.get('bookingAmount')?.invalid ? 'minmum booking price Rs.500' : '';
  }
}
