import React, { useState, useEffect } from 'react';

interface ExerciseInputProps {
  weight: number;
  reps: number;
  onChange?: (weight: number, reps: number) => void;
}

export default function ExerciseInput({ weight, reps, onChange }: ExerciseInputProps) {
  const [localweight, setLocalweight] = useState(weight);
  const [localReps, setLocalReps] = useState(reps);

  useEffect(() => {
    setLocalweight(weight);
  }, [weight]);
  useEffect(() => {
    setLocalReps(reps);
  }, [reps]);

  function handleweightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Math.max(0, Number(e.target.value));
    setLocalweight(value);
    onChange?.(value, localReps);
  }

  function handleRepsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Math.max(1, Number(e.target.value));
    setLocalReps(value);
    onChange?.(localweight, value);
  }

  return (
    <fieldset className="flex gap-2 items-end w-full justify-between" aria-label="weight y reps">
      <label className="flex flex-col text-xs font-medium text-gray-700 dark:text-gray-200">
        <span>weight</span>
        <input
          type="number"
          min={0}
          value={localweight}
          onChange={handleweightChange}
          className="w-16 rounded border border-gray-300 dark:border-gray-600 bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white transition"
          aria-label="weight"
        />
      </label>
      <label className="flex flex-col text-xs font-medium text-gray-700 dark:text-gray-200">
        <span>Reps</span>
        <input
          type="number"
          min={1}
          value={localReps}
          onChange={handleRepsChange}
          className="w-14 rounded border border-gray-300 dark:border-gray-600 bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white transition"
          aria-label="Reps"
        />
      </label>
    </fieldset>
  );
}
