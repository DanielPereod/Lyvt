import httpClient from "./httpClient";

export const getWorkoutById = (id: number) => httpClient.get(`/workout/${id}`)
export const createWorkout = (data) => httpClient.post('/workout', data)
