import debounce from "lodash/debounce";

export const debouncedSave = debounce(async (value) => {
  console.log('Saving...');
  console.log(value);

  await fetch("http://localhost:8080/workout", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: value }),
  })
}, 1000);
