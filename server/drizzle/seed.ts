import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { seed } from "drizzle-seed";
import { exercisesTable, workoutExercisesTable, workoutsTable } from "../src/db/schema";
import { db } from "../src/db/db";

async function main() {
  await db.delete(exercisesTable)
  await db.delete(workoutExercisesTable)
  await db.delete(workoutsTable)

  await seed(db, { exercisesTable }).refine((f) => ({
    exercisesTable: {
      columns: {
        name: f.valuesFromArray({ values: ["Squat", "Bench Press", "Deadlift", "Overhead Press", "Pull Up", "Row"] }),
        type: f.valuesFromArray({ values: ["Leg", "Chest", "Back", "Shoulder", "Back"] }),
      },
    },
  }));


  await seed(db, { workoutExercisesTable }).refine((f) => ({
    workoutExercisesTable: {
      columns: {
        date: f.valuesFromArray({ values: ["2023-10-01T00:00:00.000Z", "2023-10-02T00:00:00.000Z", "2023-10-03T00:00:00.000Z"] }),
        exerciseId: f.valuesFromArray({ values: [1, 2, 3, 4, 5, 6] }),
        sets: f.valuesFromArray({ values: [
          JSON.stringify([{ reps: 5, weight: 100 }, { reps: 5, weight: 110 }]),
          JSON.stringify([{ reps: 5, weight: 80 }, { reps: 5, weight: 90 }]),
          JSON.stringify([{ reps: 5, weight: 60 }, { reps: 5, weight: 70 }]),
        ]}),
      }
    }
  }))
}

main();
