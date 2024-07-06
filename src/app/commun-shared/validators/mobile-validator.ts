import { AbstractControl } from "@angular/forms";

export const mobileValidator = (control: AbstractControl) => {
   const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{7,16}$/;
  // const regex = /^[5][0-9]{1-7}/;
    const valid = regex.test(control.value);

    if (
      control.value !== null &&
      control.value !== "" &&
      control.value !== undefined
    ) {
      return valid
        ? null
        : { invalidMobile: { valid: false, value: control.value } };
    }
  };
  