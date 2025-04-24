import {Exercise} from './exercise'
import { WorkoutExercise } from './workoutExercise';

export interface Workout {
  id: number;
  name: string;
  date: string; // ISO date string
  exercises: WorkoutExercise[];
}

export interface WorkoutCreate {
  name: string;
  date: string;
}

export interface WorkoutUpdate {
  name: string;
  date: string;
}
