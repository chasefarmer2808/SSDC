export class Officer {
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  emailAddress: string;
  showInfo: boolean;
  photoUri: any;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.role = '';
    this.bio = '';
    this.emailAddress = '';
    this.showInfo = false;
  }
}
