import { WorkoutExercise, WorkoutExerciseCreate, WorkoutExerciseUpdate } from "../../../common/types/workoutExercise";
import httpClient from "./httpClient";

export const getWorkoutExercise = async (id: number): Promise<WorkoutExercise> => httpClient.get('/workout_exercise')
export const updateWorkoutExercise = async (data: WorkoutExerciseUpdate): Promise<WorkoutExercise> => httpClient.put('/workout_exercise', data)
export const createWorkoutExercise = async (data: WorkoutExerciseCreate): Promise<WorkoutExercise> => httpClient.post('/workout_exercise', data)
export const deleteWorkoutExercise = async (id: number): Promise<void> => httpClient.delete(`/workout_exercise/${id}`)
