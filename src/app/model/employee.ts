import { Role } from "./role";
import { Skill } from "./skill";

export class Employee {
    user_id?: number;
    firstName: string;
    lastName: String;
    email: String;
    mobile: String;
    active: boolean;
    password: String;
    roles: String[];
    skills: Skill[]
    photoName: String
    adresse: string
    passportNumber: number
    visaValidateDate: string
    passeportValidityDate: string
    files: string[];
    constructor(firstName: string, lastName: String, email: String, mobile: String, password: String, roles: String[], adresse: string) {

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

    firstName: String;
    lastName: String;
    email: String;
    mobile: String;
    adresse: string
    passportNumber: number
    visaValidateDate: string
    passeportValidityDate: string

    constructor(firstName: String, lastName: String, mobile: String, email: String, adresse: string, passportNumber: number,

        passeportValidityDate: string, visaValidateDate: string) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.email = email;
        this.adresse = adresse;
        this.passportNumber = passportNumber;
        this.passeportValidityDate = passeportValidityDate;

        this.visaValidateDate = visaValidateDate;
    }

    // functionconstructor(firstName: String, lastName: String) 
    // {

    //     this.firstName = firstName;
    //     this.lastName = lastName;

    // }


}