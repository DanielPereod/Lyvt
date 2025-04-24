import React, { useEffect, useState } from "react";
import { createWorkout } from "../api/workout";
import type { WorkoutCreate } from "../../../common/types/workout";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router";


export default function Home() {
  let navigate = useNavigate();

  const handleCreateWorkout = async () => {
    const newWorkout: WorkoutCreate = {
      date: new Date().toISOString(),
      name: `Workout ${new Date().toLocaleDateString()}`,
    };
    const workout = await createWorkout(newWorkout);
    console.log("Created workout", workout);
    navigate(`/workout/${workout.id}`);
  };
  return (
    <div>
      <h1>Welcome to the Workout Tracker</h1>
      <button onClick={handleCreateWorkout} className="bg-primary p-3 rounded-md hover:bg-primary-600 cursor-pointer">
        Start new workout <Spinner />
      </button>
    </div>
  );
}
