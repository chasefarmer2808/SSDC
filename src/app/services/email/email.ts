export class Email {
    emailAddress: string;
    firstName: string;
    lastName: string;
    body: string;

    constructor(emailAddress?:string, firstName?:string, lastName?:string, body?:string) {
        this.emailAddress = emailAddress || "";
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.body = body || "Hello!\r\n\r\nMy name is _____ and I would like to express my interest in the Space Systems Design Club!";
    }
}