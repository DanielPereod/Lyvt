export interface WorkoutExercise {
  id: number;
  workoutId: number;
  exerciseId: number;
  name: string;
  sets: Set[];
  date: string;
}

export interface Set {
  reps: number;
  weight: number;
  index: number;
}

export interface WorkoutExerciseCreate {
  name: string;
  workoutId: number;
  exerciseId: number;
  sets: Set[];
  date: string;
}
export interface WorkoutExerciseUpdate {
  exerciseId: number;
  sets: Set[];
  date: string;
}
