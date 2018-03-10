import { Event } from './event';

export const EventsMock: Event[] = [
  {
    name: 'event 1',
    description: 'event 1 description',
    place: {
      name: 'event 1 location'
    },
    start_time: new Date().getUTCDate().toString(),
    end_time: 'event 1 end time',
    link: 'https://facebook.com/events/1234567'
  },
  {
    name: 'event 2',
    description: 'event 2 description',
    place: {
      name: 'event 2 location'
    },
    start_time: new Date().getUTCDate().toString(),
    end_time: 'event 2 end time',
    link: 'https://facebook.com/events/1234567'
  }
];
