import express from "express";
import cors from "cors";
import {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} from "./controllers/exerciseController";
import {
  createWorkoutExercise,
  getWorkoutExercisesByDate,
  updateWorkoutExercise,
  deleteWorkoutExercise,
} from "./controllers/workoutExerciseController";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getWorkoutByDate,
  getWorkoutById,
  updateWorkout,
} from "./controllers/workoutController";
import { createType, getTypes } from "./controllers/typeController";

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.post("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    body: req.body,
  });
}); */

// Type routes
app.get("/exercise/type", getTypes);
app.post("/exercise/type", createType);

// Exercise routes
app.get("/exercise", getAllExercises);
app.get("/exercise/:id", getExerciseById);
app.post("/exercise", createExercise);
app.put("/exercise/:id", updateExercise);
app.delete("/exercise/:id", deleteExercise);

// Workout exercise routes
app.post("/workout_exercise", createWorkoutExercise);
/* app.get("/workout_exercise/:id", getWorkoutExerciseById);*/
app.put("/workout_exercise/:id", updateWorkoutExercise);
app.delete("/workout_exercise/:id", deleteWorkoutExercise);

// Workout routes
app.post("/workout", createWorkout);
app.get("/workout", getAllWorkouts);
app.get("/workout/:id", getWorkoutById);
app.get("/workout/:date", getWorkoutByDate);
app.put("/workout/:id", updateWorkout);
app.delete("/workout/:id", deleteWorkout);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
