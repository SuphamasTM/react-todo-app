import type { Todo } from "../types/todo";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}?_limit=10`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}
