import {Role} from './role';
import {Skill} from './skill';

export class Employee {
    user_id?: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    active: boolean;
    password: string;
    roles: string[];
    skills: Skill[];
    photoName: string;
    adresse: string;
    passportNumber: number;
    visaValidateDate: string;
    passeportValidityDate: string;
    files: string[];

    constructor(firstName: string, lastName: string, email: string, mobile: string, password: string, roles: string[], adresse: string) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.adresse = adresse;

    }


}

export class User {

    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    adresse: string;
    passportNumber: number;
    visaValidateDate: string;
    passeportValidityDate: string;

    constructor(firstName: string, lastName: string, mobile: string, email: string, adresse: string, passportNumber: number, passeportValidityDate: string, visaValidateDate: string) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.email = email;
        this.adresse = adresse;
        this.passportNumber = passportNumber;
        this.passeportValidityDate = passeportValidityDate;

        this.visaValidateDate = visaValidateDate;
    }

    // functionconstructor(firstName: string, lastName: string)
    // {

    //     this.firstName = firstName;
    //     this.lastName = lastName;

    // }


}
