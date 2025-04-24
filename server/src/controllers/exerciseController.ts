import type { Request, Response } from "express";
import { db } from "../db/db";
import { exercisesTable } from "../db/schema";
import { eq } from "drizzle-orm";

// Get all exercises
export const getAllExercises = async (req: Request, res: Response) => {
  const exercises = await db.select().from(exercisesTable);
  res.status(200).json(exercises);
};

// Get a specific exercise by ID
export const getExerciseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const exercise = await db
    .select()
    .from(exercisesTable)
    .where(eq(exercisesTable.id, Number(id)));
  if (exercise.length === 0) {
    res.status(404).json({ error: "Exercise not found" });
    return;
  }
  res.status(200).json(exercise[0]);
};

// Create a new exercise
export const createExercise = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;
    await db.insert(exercisesTable).values({ name, type });
    res.status(201).json({ message: "Exercise created" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create exercise" });
  }
};

// Update an exercise by ID
export const updateExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type } = req.body;
  try {
    const updated = await db.update(exercisesTable)
      .set({ name, type })
      .where(eq(exercisesTable.id, Number(id)))
      .returning();
    if (updated.length === 0) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }
    res.status(200).json({ message: "Exercise updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update exercise" });
  }
};

// Delete an exercise by ID
export const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await db.delete(exercisesTable)
      .where(eq(exercisesTable.id, Number(id)))
      .returning();
    if (deleted.length === 0) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }
    res.status(200).json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete exercise" });
  }
};
