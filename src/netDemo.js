export async function netDemo() {
  const todoToSave = {
    userId: 1,
    title: "IT ACADEMY",
    completed: false,
  };

  const addResponse = await fetch(
    "https://jsonplaceholder.typicode.com/todos/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoToSave),
    }
  );

  if (!addResponse.ok) {
    console.log(`Error with status ${addResponse.status}`);
    return;
  }

  console.log(`Ok with status ${addResponse.status}`);

  const data = await addResponse.json();
  console.log(data);

  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");

  if (!response.ok) {
    console.log(`Error with status ${response.status}`);
    return;
  }

  console.log(`Ok with status ${response.status}`);

  const json = await response.json();
  console.log(json);
}
