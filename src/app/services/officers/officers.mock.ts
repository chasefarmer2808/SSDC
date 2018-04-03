import { Officer } from './officer';

export const OfficersMock: Officer[] = [
  {
    firstName: 'Aastha',
    lastName: 'Rajbhandary',
    role: 'President',
    bio: `Aastha is a 3th year Aerospace Engineering major at the University of
          Florida.`,
    emailAddress: 'aasthar@ufl.edu',
    showInfo: false,
    photo: new File([], 'test.jpg')
  },
  {
    firstName: 'John',
    lastName: 'Kempienski',
    role: 'VP Internal',
    bio: `John Kempienski is a 4th year Mechanical Engineering major at the
          University of Florida.`,
    emailAddress: 'kempienski@ufl.edu',
    showInfo: false,
    photo: new File([], 'test.jpg')
  },
  {
    firstName: 'Kevin',
    lastName: 'Almanzar',
    role: 'VP External',
    bio: `Kevin Almanzar is a 4th year Aerospace Engineering major at the
          University of Florida.`,
    emailAddress: 'kalmanzar5@ufl.edu',
    showInfo: false,
    photo: new File([], 'test.jpg')

  },
  {
    firstName: 'Zane',
    lastName: 'Gyorko',
    role: 'BEC Rep',
    bio: `Zane Gyorko is a 2nd year Electrical Engineering major at the
          University of Florida.`,
    emailAddress: 'zgyorko@ufl.edu',
    showInfo: false,
    photo: new File([], 'test.jpg')
  },
  {
    firstName: 'Chris',
    lastName: 'Charters',
    role: 'Treasurer',
    bio: 'Chris Charters has the best mom in the whole wide world',
    emailAddress: 'chartersauce25@ufl.edu',
    showInfo: false,
    photo: new File([], 'test.jpg')
  },
  {
    firstName: 'Logan',
    lastName: 'Sprole',
    role: 'Secretary',
    bio: `Logan Sprole is a 3rd year Economics major at the University of
          Florida.  He uses a CM QuickFile Rapid keyboad with Cherry MX red
          switches.`,
    emailAddress: 'lsprole@ufl.edu',
    showInfo: false,
    photo: new File([], 'test.jpg')
  },
  {
    firstName: 'Chase',
    lastName: 'Farmer',
    role: 'Web Master',
    bio: `Chase Farmer is a 5th year computer engineering major at the University
          of Florida.  He has a passion for IoT and full stack development.  He
          spends his free time running, rock climbing, and making websites.`,
    emailAddress: 'chasefarmer2808@ufl.edu',
    showInfo: false,
    photo: new File([], 'test.jpg')
  }
];
