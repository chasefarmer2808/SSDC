export class Email {
    emailAddress: string;
    body: string;
    enableListServ: boolean;

    constructor() {
        this.emailAddress = "";
        this.body = "Hello!\r\n\r\nMy name is _____ and I would like to express my interest in the Space Systems Design Club!";
        this.enableListServ = false;
    }
}