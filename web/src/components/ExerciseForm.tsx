import React, { useEffect, useState } from "react";

export function ExerciseForm({
  initialName = "",
  initialType = "",
  onSubmit,
  submitLabel = "Guardar",
}: {
  initialName?: string;
  initialType?: string;
  onSubmit: (data: { name: string; type: string }) => void;
  submitLabel?: string;
}) {
  const [exerciseName, setExerciseName] = useState(initialName);
  const [selectedType, setSelectedType] = useState(initialType);
  const [types, setTypes] = useState<{ name: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/exercise/type")
      .then((res) => res.json())
      .then((data) => setTypes(data));
  }, []);

  return (
    <div>
      <input
        type="text"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Selecciona tipo</option>
        {types.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button onClick={() => onSubmit({ name: exerciseName, type: selectedType })}>
        {submitLabel}
      </button>
    </div>
  );
}
