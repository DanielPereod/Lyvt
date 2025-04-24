import React from "react";
import { ExerciseForm } from "../../components/ExerciseForm";

export default function CreateExercise() {
  const handleCreate = async (exercise: any) => {
    const response = await fetch("http://localhost:8080/exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });
    if (!response.ok) {
      throw new Error("Error creating exercise");
    }
    return response.json();
  };

  return <ExerciseForm onSubmit={handleCreate} submitLabel="Crear" />;
}
