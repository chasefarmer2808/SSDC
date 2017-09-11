import { Injectable } from '@angular/core';

import { Officer } from './officer';
import { Officers } from './officers';

@Injectable()
export class OfficersService {

  constructor() { }

  getOfficers(): Officer[] {
    return Officers;
  }

}
