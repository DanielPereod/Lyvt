import {Exercise} from './exercise'

export interface Workout {
  id: number;
  name: string;
  date: string; // ISO date string
  exercises: Exercise[];
}
