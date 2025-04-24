import React, { useEffect } from "react";
import { ExerciseForm } from "../../components/ExerciseForm";
import { Exercise } from "../../components/ExerciseList";
import { useParams } from "react-router";

export default function EditExercise() {
  let { id } = useParams();
  const [exercise, setExercise] = React.useState<Exercise | null>(null);


  useEffect(() => {
    fetch(`http://localhost:8080/exercise/${id}`).then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching exercise data");
      }
      return res.json();
    }
    ).then((data) => {
      console.log("Fetched exercise data:", data);
      setExercise(data);
    }).catch((error) => {
      console.error("Error fetching exercise:", error);
    });
  }, [id]);

  const handleEdit = async (exercise: any) => {
    const response = await fetch(`http://localhost:8080/exercise/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });
    if (!response.ok) {
      throw new Error("Error editing exercise");
    }
    return response.json();
  };

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <ExerciseForm
      initialName={exercise?.name}
      initialType={exercise?.type}
      onSubmit={handleEdit}
      submitLabel="Guardar cambios"
    />
  );
}
