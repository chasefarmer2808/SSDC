export class Email {
    subject: string;
    emailAddress: string;
    body: string;
    enableListServe: boolean;

    constructor() {
        this.subject = "Email from SSDC Website";
        this.emailAddress = "";
        this.body = "Hello!\r\n\r\nMy name is _____ and I would like to express my interest in the Space Systems Design Club!";
        this.enableListServe = false;
    }
}