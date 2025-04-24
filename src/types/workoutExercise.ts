export interface WorkoutExercise {
  id: number;
  workoutId: number;
  exerciseId: number;
  sets: Set[];
  date: string;
}

export interface Set {
  reps: number;
  weight: number;
}
