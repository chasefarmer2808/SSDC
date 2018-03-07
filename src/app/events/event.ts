import { Place } from './place';

export interface Event {
  name: string;
  description: string;
  place: Place;
  start_time: string;
  end_time: string;
  link: string;
}
