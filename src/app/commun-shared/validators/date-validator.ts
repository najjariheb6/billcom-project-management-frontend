import { FormGroup } from "@angular/forms";

export function dateValidator(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const today = new Date().getTime();

    if (!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }

    // return null if there's no errors
    /*  return  new Date(control.value).getTime() < today 
        ? {validDate: 'it/s ok' } 
        :control.setErrors({ dateValidator: true });*/
    if (new Date(control.value).getTime() < today) {
      control.setErrors({ dateValidator: true });
    } else {
      control.setErrors(null);
      return false;
    }





  }
}

export function dueDateValidator(controlName: string, matchingControlName: string) {

  return (formGroup: FormGroup) => {

    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];


    if (matchingControl.errors && !matchingControl.errors.dueDateValidator) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (new Date(matchingControl.value).getTime() < new Date(control.value).getTime()) {
      matchingControl.setErrors({ dueDateValidator: true });
    } else {
      matchingControl.setErrors(null);

    }
  }
}

export function dateControl(controlName: string, startedate:string ,  dueDated:string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const startControl = new Date(startedate).getTime();

    const endControl = new Date(dueDated).getTime();

    if (!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }

    // return null if there's no errors
    /*  return  new Date(control.value).getTime() < today 
        ? {validDate: 'it/s ok' } 
        :control.setErrors({ dateValidator: true });*/
    if (new Date(control.value).getTime() < startControl || new Date(control.value).getTime() > endControl  ) {
      control.setErrors({ dateControl: true });
    } else {
      control.setErrors(null);
      return false;
    }





  }
}

export function endTeamDateControl(controlName: string,  matchingControlName: string,startedate:string ,  dueDated:string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const startControl = new Date(startedate).getTime();
    const endControl = new Date(dueDated).getTime();
    const matchingControl = formGroup.controls[matchingControlName];

    if (!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }

    // return null if there's no errors
    /*  return  new Date(control.value).getTime() < today 
        ? {validDate: 'it/s ok' } 
        :control.setErrors({ dateValidator: true });*/
    if (new Date(control.value).getTime() < startControl || new Date(control.value).getTime() > endControl || new Date(control.value).getTime() > new Date(matchingControl.value).getTime()) {
      control.setErrors({ endTeamDateControl: true });
    } else {
      control.setErrors(null);
      return false;
    }





  }
}