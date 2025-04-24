import httpClient from "./httpClient";
import type {Workout, WorkoutCreate, WorkoutUpdate} from '../../../common/types/workout';

export const getAllWorkouts = async (): Promise<Workout[]> => httpClient.get('/workout')
export const getWorkoutById = async (id: number):Promise<Workout> => httpClient.get(`/workout/${id}`)
export const createWorkout = async (data: WorkoutCreate): Promise<Workout> => (await httpClient.post('/workout', data)).data
export const updateWorkout = async (data: WorkoutUpdate): Promise<Workout> => httpClient.put('/workout', data)
export const deleteWorkout = async (id: number): Promise<void> => httpClient.delete(`/workout/${id}`)
