import type { Request, Response } from "express";
import { db } from "../db/db";
import { exercisesTable, workoutsTable, workoutExercisesTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const setSchema = z.array(
  z.object({
    index: z.number(),
    weight: z.number(),
    reps: z.number(),
  })
);

// Get all workouts
export const getAllWorkouts = async (req: Request, res: Response) => {
  const workouts = await db.select().from(workoutsTable);
  res.status(200).json(workouts);
};

// Get a specific workout by ID
export const getWorkoutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "ID is required" });
    return;
  }

  const [workout] = await db
    .select()
    .from(workoutsTable)
    .where(eq(workoutsTable.id, parseInt(id)));

  if (!workout) {
    throw new Error("Workout not found");
  }

  const rows = await db
    .select({
      workoutExerciseId: workoutExercisesTable.id,
      sets: workoutExercisesTable.sets,
      exerciseId: exercisesTable.id,
      exerciseName: exercisesTable.name,
    })
    .from(workoutExercisesTable)
    .innerJoin(exercisesTable, eq(workoutExercisesTable.exerciseId, exercisesTable.id))
    .where(eq(workoutExercisesTable.workoutId, parseInt(id)));

  const exercises = rows.map((row) => {
    const parsedSets = JSON.parse(JSON.parse(row.sets));
    return {
      id: row.exerciseId,
      name: row.exerciseName,
      sets: setSchema.safeParse(parsedSets),
    };
  });

  res.json({
    id: workout.id,
    name: workout.name,
    date: workout.date,
    exercises,
  });
};

// Get a workout by date
export const getWorkoutByDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  if (!date) {
    res.status(400).json({ error: "Date is required" });
    return;
  }
  const workout = await db.select().from(workoutsTable).where(eq(workoutsTable.date, date));
  if (workout.length === 0) {
    res.status(404).json({ error: "Workout not found for this date" });
    return;
  }
  res.status(200).json(workout[0]);
};

// Create a new workout
export const createWorkout = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { name, date } = req.body;
    const workout = await db.insert(workoutsTable).values({ name, date }).returning().get();
    res.status(201).json(workout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create workout" });
  }
};

// Update a workout by ID
export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, date } = req.body;
  try {
    const updated = await db
      .update(workoutsTable)
      .set({ name, date })
      .where(eq(workoutsTable.id, Number(id)))
      .returning();
    if (updated.length === 0) {
      res.status(404).json({ error: "Workout not found" });
      return;
    }
    res.status(200).json({ message: "Workout updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update workout" });
  }
};

// Delete a workout by ID
export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await db
      .delete(workoutsTable)
      .where(eq(workoutsTable.id, Number(id)))
      .returning();
    if (deleted.length === 0) {
      res.status(404).json({ error: "Workout not found" });
      return;
    }
    res.status(200).json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete workout" });
  }
};
