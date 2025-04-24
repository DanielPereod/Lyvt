import React, { useEffect, useState } from "react";
import { Exercise } from "../ExerciseTracker";


export function ExerciseSelector({selectedExercises, setSelectedExercises}: {selectedExercises: Exercise[], setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>}) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<{ name: string }[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8080/exercise")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((error) => console.error("Error fetching exercises:", error));

    fetch("http://localhost:8080/exercise/type")
      .then((res) => res.json())
      .then((data) => setFilters(data))
      .catch((error) => console.error("Error fetching filters:", error));

    console.log("Filters:", filters);
  }, []);

  const handleSelectedExercises = (exercise: Exercise) => {
    // Only one exercise selectable: set as array with just this exercise
    setSelectedExercises([exercise]);
  }

  const exewrciseIsSelected = (exercise: Exercise) => {
    return selectedExercises.length > 0 && selectedExercises[0].id === exercise.id;
  }

  return (
    <div className="h-full flex flex-col w-full">
      <h2 className="text-xl font-semibold">Select an Exercise</h2>
      <div className="mb-4">
        <select
          className="p-2 bg-gray-50 dark:bg-gray-800 w-full rounded-md cursor-pointer"
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {/* Loading */}
          {!filters.length && (
            <option value="" disabled>
              Loading...
            </option>
          )}
          <option value="">All</option>
          {filters &&
            filters.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          className="p-2 bg-gray-50 dark:bg-gray-800 w-full rounded-md"
          type="text"
          placeholder="Search exercises"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-4">
        {exercises
          .filter((exercise) => exercise.type === selectedFilter || selectedFilter === "")
          .filter((exercise) => exercise.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((exercise) => (
            <button key={exercise.id} className={`bg-gray-50 dark:bg-gray-800 p-2 rounded-md cursor-pointer ${exewrciseIsSelected(exercise) && "bg-primary dark:bg-primary"}`} onClick={() => handleSelectedExercises(exercise)}>
              <span className="exercise-name">{exercise.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
