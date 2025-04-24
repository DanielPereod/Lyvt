import httpClient from "./httpClient";
import { Exercise } from "../../../common/types/exercise";

export const getAllExercises = async (): Promise<Exercise[]> => httpClient.get('/exercise')
export const getExerciseById = async (id: number): Promise<Exercise> => httpClient.get(`/exercise/${id}`)
export const updateExercise = async (data: Exercise): Promise<Exercise> => httpClient.put('/exercise', data)
export const createExercise = async (data: Exercise): Promise<Exercise> => httpClient.post('/exercise', data)
export const deleteExercise = async (id: number): Promise<void> => httpClient.delete(`/exercise/${id}`)
