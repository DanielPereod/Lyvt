import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Tabla de ejercicios
export const exercisesTable = sqliteTable("exercises", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  type: text()
    .notNull()
    .references(() => exerciseTypesTable.name),
});

// Tabla de tipos de ejercicios
export const exerciseTypesTable = sqliteTable("exercise_types", {
  name: text().notNull().primaryKey(),
});

// Tabla de entrenamientos
export const workoutsTable = sqliteTable("workouts", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  date: text().notNull(), // formato ISO string
});

// Tabla intermedia: ejercicios realizados en un entrenamiento específico
export const workoutExercisesTable = sqliteTable("workout_exercises", {
  id: int().primaryKey({ autoIncrement: true }),
  workoutId: int()
    .notNull()
    .references(() => workoutsTable.id),
  exerciseId: int()
    .notNull()
    .references(() => exercisesTable.id),
  date: text().notNull(), // repetido por simplicidad, puede omitirse si no varía
  sets: text().notNull(), // JSON string con array de sets: [{ index, weight, reps }]
});
