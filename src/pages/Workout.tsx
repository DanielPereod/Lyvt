import React, { useEffect } from "react";
import ExerciseTracker from "../components/ExerciseTracker";
import { useParams } from "react-router";
import { debounce } from "lodash";

// Move SetData to a shared type and make weight and reps required
export interface SetData {
  index: number;
  weight: number;
  reps: number;
}

interface Workout {
  id: number;
  name: string;
  date: string;
  exercises: Exercise[];
}

interface Exercise {
  id: number;
  name: string;
  sets: SetData[];
}

export default function WorkoutPage() {
  const { id } = useParams();
  const [currentExercise, setCurrentExercise] = React.useState<Exercise | null>(null);
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
    const debouncedSave = debounce(async () => {
      await fetch("http://localhost:8080/workout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
      });
    }, 1000);
    return () => debouncedSave.cancel(); // limpiamos al desmontar
  }, [workout]);
  const addExercise = (exercise: Exercise) => {
    setWorkout((prev) => {
      const updatedExercises = [...prev.exercises, exercise];
      return { ...prev, exercises: updatedExercises };
    });
    setCurrentExercise(exercise);
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
              onClick={() => setCurrentExercise(exercise)}
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
