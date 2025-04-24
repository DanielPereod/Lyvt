import React, { useState, useEffect } from "react";
import { ExerciseSelectorModal } from "./Exercise/ExerciseSelectorModal";

// Define or import the Exercise type
export interface Exercise {
  name: string;
  id: number;
  type: string;
}

interface SetData {
  index: number;
  weight: number;
  reps: number;
}

interface WorkoutExercise {
  name: string;
  sets: SetData[];
}

interface ExerciseTrackerProps {
  initialName?: string;
  initialSets?: SetData[];
  onChangeSets?: (sets: SetData[]) => void;
  onChangeName?: (name: string) => void;
}

export default function ExerciseTracker({
  initialName = "",
  initialSets,
  onChangeSets,
  onChangeName,
}: ExerciseTrackerProps) {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [exerciseName, setExerciseName] = useState(initialName);
  const [sets, setSets] = useState<SetData[]>(
    initialSets && initialSets.length > 0
      ? initialSets.map((set, idx) => ({ ...set, index: idx }))
      : [{ index: 0, weight: 0, reps: 1 }]
  );

  useEffect(() => {
    if (selectedExercises.length > 0) {
      setExerciseName(selectedExercises[0].name);
      handleNameChange(selectedExercises[0].name);
      setModalOpen(false); // Always close modal when an exercise is selected
    }
  }, [selectedExercises]);

  // Sincroniza el estado interno cuando cambian los props
  useEffect(() => {
    setExerciseName(initialName);
  }, [initialName]);

  useEffect(() => {
    setSets(
      initialSets && initialSets.length > 0
        ? initialSets.map((set, idx) => ({ ...set, index: idx }))
        : [{ index: 0, weight: 0, reps: 1 }]
    );
  }, [initialSets]);

  function handleNameChange(name: string): void {
    setExerciseName(() => {
      if (onChangeName) {
        onChangeName(name);
      }
      return name;
    });
  }
  function handleSetChange(index: number, newweight: number, newReps: number) {
    setSets((prev) => {
      const updated = prev.map((item) => (item.index === index ? { ...item, weight: newweight, reps: newReps } : item));
      if (onChangeSets) onChangeSets(updated);
      return updated;
    });
  }

  function addSet() {
    setSets((prev) => {
      const updated = [...prev, { index: prev.length > 0 ? prev[prev.length - 1].index + 1 : 0, weight: 0, reps: 1 }];
      if (onChangeSets) onChangeSets(updated);
      return updated;
    });
  }

  function removeSet(index: number) {
    setSets((prev) => {
      const filtered = prev.filter((item) => item.index !== index);
      const updated = filtered.map((item, idx) => ({ ...item, index: idx }));
      if (onChangeSets) onChangeSets(updated);
      return updated;
    });
  }

  // Estado global del ejercicio
  const exerciseState: WorkoutExercise = {
    name: exerciseName,
    sets,
  };

  return (
    <section aria-label="Ejercicio" className="bg-white dark:bg-black dark:text-white rounded-xl p- mx-auto mt-8 ">
      <label className="block mb-4">
        <div className="relative">
          <button
            className="cursor-pointer p-2 bg-gray-50 dark:bg-gray-800 w-full rounded-md font-bold"
            onClick={() => setModalOpen(true)}
          >
            {exerciseName}
          </button>
          <ExerciseSelectorModal
            modalOpen={modalOpen}
            selectedExercises={selectedExercises}
            setModalOpen={setModalOpen}
            setSelectedExercises={setSelectedExercises}
          />
          {/* MODAL */}
        </div>
      </label>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 px-1 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <div className="col-span-1 text-center">SET</div>
          <div className="col-span-3 text-center">KG</div>
          <div className="col-span-2 text-center">REPS</div>
          <div className="col-span-1" />
        </div>
        <div className="space-y-2">
          {sets.map((set) => (
            <div
              key={set.index}
              className="grid grid-cols-7 gap-2 items-center bg-gray-50 dark:bg-gray-800 rounded px-1 py-1"
            >
              <span className="col-span-1 w-full text-center text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 py-1">
                {set.index + 1}
              </span>
              <div className="col-span-3 flex justify-center">
                <input
                  type="number"
                  min={0}
                  value={set.weight}
                  onChange={(e) => handleSetChange(set.index, Number(e.target.value), set.reps)}
                  className="w-20 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white transition"
                  aria-label="weight"
                  placeholder=""
                />
              </div>
              <div className="col-span-2 flex justify-center">
                <input
                  type="number"
                  min={1}
                  value={set.reps}
                  onChange={(e) => handleSetChange(set.index, set.weight, Number(e.target.value))}
                  className="w-16 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white transition"
                  aria-label="Reps"
                  placeholder=""
                />
              </div>
              <button
                className="col-span-1 flex justify-center items-center ml-1 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition disabled:opacity-40"
                onClick={() => removeSet(set.index)}
                disabled={sets.length === 1}
                title="Eliminar set"
                aria-label={`Eliminar set ${set.index + 1}`}
                type="button"
              >
                <span aria-hidden>✕</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className="mt-4 w-full py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-700 dark:text-blue-300 font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={addSet}
        type="button"
      >
        + Add set
      </button>
      <pre
        className="mt-6 bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs text-gray-600 dark:text-gray-400 overflow-x-auto"
        aria-label="Estado del ejercicio"
      >
        {JSON.stringify(exerciseState, null, 2)}
      </pre>
    </section>
  );
}
