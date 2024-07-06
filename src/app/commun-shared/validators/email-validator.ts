import { AbstractControl, FormGroup } from "@angular/forms";

export const emailValidator = (control: AbstractControl) => {
   // const regex = /^[a-z-A-Z-0-9._%+-]+@billcom-consulting+\.[a-z]{2,4}$/;
    const regex = /^[a-z-A-Z-0-9._%+-]+@billcom-consulting+\.[a-z]{2,4}$/;
    const valid = regex.test(control.value);
    if (
      control.value !== null &&
      control.value !== "" &&
      control.value !== undefined
    ) {
      return valid
        ? null
        : { invalidEmail: { valid: false, value: control.value } };
    }
  };
 