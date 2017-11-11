export class Email {
    emailAddress: string;
    firstName: string;
    lastName: string;
    body: string;
    enableListServ: boolean;

    constructor() {
        this.emailAddress = "";
        this.firstName = "";
        this.lastName = "";
        this.body = "Hello!\r\n\r\nMy name is _____ and I would like to express my interest in the Space Systems Design Club!";
        this.enableListServ = false;
    }
}