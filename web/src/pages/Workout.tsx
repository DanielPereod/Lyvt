import React, { useEffect } from "react";
import ExerciseTracker from "../components/ExerciseTracker";
import type { Exercise } from "../../../common/types/exercise";
import type { Workout } from "../../../common/types/workout";


import { useParams } from "react-router";
import { debounce } from "lodash";
import { WorkoutExercise } from "../../../common/types/workoutExercise";

// Move SetData to a shared type and make weight and reps required
export interface SetData {
  index: number;
  weight: number;
  reps: number;
}

export default function WorkoutPage() {
  const { id } = useParams();
  const [currentExercise, setCurrentExercise] = React.useState<(Exercise & { sets: SetData[] }) | null>(null);
  const [workout, setWorkout] = React.useState<Workout>({
    id: 0,
    name: "",
    date: "",
    exercises: [],
  });

  useEffect(() => {
    // sample workout data
    fetch(`http://localhost:8080/workout/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setCurrentExercise(data.exercises[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const debouncedSave = debounce(async () => {}, 1000);
    return () => debouncedSave.cancel(); // limpiamos al desmontar
  }, [workout]);

  const addExercise = (exercise: Omit<WorkoutExercise, "workoutId" | "exerciseId" | "date">) => {
      const newExercise: WorkoutExercise & Exercise = {
        ...exercise,
        workoutId: workout.id,
        exerciseId: Date.now(),
        date: new Date().toISOString(),
        type: "default", // Provide a default or appropriate type value
      };
      setWorkout((prev) => {
        const updatedExercises = [...prev.exercises, newExercise];
        return { ...prev, exercises: updatedExercises };
      });
      setCurrentExercise(newExercise);
    };

  const removeExercise = (id: number) => {
    setWorkout((prev) => {
      const updatedExercises = prev.exercises.filter((ex) => ex.id !== id);
      return { ...prev, exercises: updatedExercises };
    });
  };

  const updateSets = (sets: SetData[]) => {
    setWorkout((prev) => {
      const updatedExercises = prev.exercises.map((ex) => {
        if (ex.id === currentExercise?.id) {
          return { ...ex, sets };
        }
        return ex;
      });
      return { ...prev, exercises: updatedExercises };
    });
  };
  const updateName = (name: string) => {
    if (currentExercise) {
      setWorkout((prev) => {
        const updatedExercises = prev.exercises.map((ex) => {
          if (ex.id === currentExercise.id) {
            return { ...ex, name };
          }
          return ex;
        });
        return { ...prev, exercises: updatedExercises };
      });
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">{workout.name}</h1>
        <p>{new Date(workout.date).toLocaleDateString()}</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {workout.exercises.map((exercise) => (
            <button
              onClick={() => setCurrentExercise({ ...exercise, type: "default", sets: exercise.sets || [] })}
              key={exercise.id}
              className={
                `bg-gray-50 dark:bg-gray-700 p-2 rounded-md ` +
                (currentExercise?.id === exercise.id ? "ring-2 ring-primary" : "")
              }
            >
              <span>{exercise.name}</span>
            </button>
          ))}
          <button
            onClick={() => addExercise({ id: Date.now(), name: "New Exercise", sets: [] })}
            className="bg-green-500 p-2 rounded-md"
          >
            <span>Add Exercise</span>
          </button>
        </div>
      </div>
      <ExerciseTracker
        initialName={currentExercise?.name}
        initialSets={currentExercise?.sets}
        onChangeSets={updateSets}
        onChangeName={updateName}
      />
    </div>
  );
}
