import React from "react";
import { ExerciseSelector } from "./ExerciseSelector";
import { Exercise } from "../ExerciseTracker";

interface Props {
  modalOpen: boolean;
  selectedExercises: Exercise[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ExerciseSelectorModal({ selectedExercises, setSelectedExercises, modalOpen, setModalOpen }: Props) {
  if(modalOpen === false) return null;
  return (
    <div
      className="fixed inset-0 p-10 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setModalOpen(false);
      }}
    >
      <div
        className="p-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-h-full max-w-150 w-full overflow-auto"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="cursor-pointer" onMouseDown={() => setModalOpen(false)}>
          Close
        </button>
        <ExerciseSelector selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} />
      </div>
    </div>
  );
}
