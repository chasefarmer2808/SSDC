import { Injectable } from '@angular/core';

import { Officer } from './officer';
import { Officers } from './officers';

@Injectable()
export class OfficersService {

  constructor() { }

  getOfficers(): Officer[] {
    return Officers;
  }

  getPresident(): Officer {
    for (let officer of Officers) {
      if (officer.role == 'President') {
        return officer;
      }
    }
  }

}
