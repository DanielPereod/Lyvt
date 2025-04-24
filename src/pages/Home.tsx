import React, { useEffect, useState } from "react";
import ExerciseInput from "../components/ExerciseInput";
import ExerciseTracker from "../components/ExerciseTracker";
import ExerciseList, { Exercise } from "../components/ExerciseList";
import {ExerciseSelector} from "../components/Exercise/ExerciseSelector";

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/exercise")
      .then((res) => res.json())
      .then((data) => setExercises(data));
  }, []);

  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExerciseIds((prev) =>
      prev.includes(exercise.id)
        ? prev.filter((id) => id !== exercise.id)
        : [...prev, exercise.id]
    );
  };

/*   const selectedExercises = exercises.filter((ex) => selectedExerciseIds.includes(ex.id));
 */
  return (
  <ExerciseSelector selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises}/>
  );
}
