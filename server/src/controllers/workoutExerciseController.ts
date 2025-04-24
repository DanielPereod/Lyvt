import type { Request, Response } from "express";
import { db } from "../db/db";
import { exercisesTable, workoutExercisesTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { setSchema } from "./workoutController";

// Helper: validate date (ISO string, UTC midnight)
function isValidDate(date: string) {
  return /^\d{4}-\d{2}-\d{2}T00:00:00.000Z$/.test(date);
}
// Helper: validate sets (array of objects with reps and weight)
function isValidSets(sets: any) {
return true
}

// Create new workout exercise
export const createWorkoutExercise = async (req: Request, res: Response) => {
  const { date, exerciseId, sets, workoutId } = req.body;
  if (!date || !exerciseId || !sets || !workoutId) {
    res.status(400).json({ error: "Date, exerciseId and sets are required" });
    return;
  }
  if (!isValidDate(date)) {
    res.status(400).json({ error: "Date must be in ISO format (UTC midnight)" });
    return;
  }
  if (!isValidSets(sets)) {
    res.status(400).json({ error: "Sets must be an array of objects with reps and weight" });
    return;
  }
  try {
    await db.insert(workoutExercisesTable).values({ date, exerciseId, sets: JSON.stringify(sets), workoutId });
    res.status(201).json({ message: "Workout exercise created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create workout exercise" });
  }
};

// Get all exercises for a specific date
export const getWorkoutExercisesByDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  if (!date || !isValidDate(date)) {
    res.status(400).json({ error: "Date is required and must be in ISO format (UTC midnight)" });
    return;
  }
  const workoutExercises = await db
    .select()
    .from(workoutExercisesTable)
    .where(eq(workoutExercisesTable.date, date))
    .innerJoin(exercisesTable, eq(workoutExercisesTable.exerciseId, exercisesTable.id));
  if (workoutExercises.length === 0) {
    res.status(404).json({ error: "No exercises found for this date" });
    return;
  }
  res.status(200).json(workoutExercises);
};

// Update a workout_exercise by id
export const updateWorkoutExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sets } = req.body;
  if (!sets || !isValidSets(sets)) {
    res.status(400).json({ error: "Sets are required and must be valid" });
    return;
  }
  try {
    const updated = await db
      .update(workoutExercisesTable)
      .set({ sets: JSON.stringify(sets) })
      .where(eq(workoutExercisesTable.id, Number(id)))
      .returning();
    if (updated.length === 0) {
      res.status(404).json({ error: "Workout exercise not found" });
      return;
    }
    res.status(200).json({ message: "Workout exercise updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update workout exercise" });
  }
};

// Delete a workout_exercise by id
export const deleteWorkoutExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await db
      .delete(workoutExercisesTable)
      .where(eq(workoutExercisesTable.id, Number(id)))
      .returning();
    if (deleted.length === 0) {
      res.status(404).json({ error: "Workout exercise not found" });
      return;
    }
    res.status(200).json({ message: "Workout exercise deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete workout exercise" });
  }
};
