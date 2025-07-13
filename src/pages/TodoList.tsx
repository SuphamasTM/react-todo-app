import { useEffect, useState } from "react";
import { fetchTodos } from "../services/api";
import type { Todo } from "../types/todo";
import { TodoItem } from "../components/TodoItem";
import { AnimatePresence } from "framer-motion";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(() => setError("Failed to load todos"))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number, newTitle: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    const newItem: Todo = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
    };
    setTodos([newItem, ...todos]);
    setNewTodo("");
  };

  // แยก todos เป็น active และ completed
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  // คำนวณจำนวนรายการ
  const totalTasks = todos.length;
  const completedTasks = completedTodos.length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-blue-700 dark:text-blue-400 mb-4">
          Todo List
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-300 border-gray-300 dark:border-gray-600"
            placeholder="Add new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            autoFocus
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* TO DO Section with counter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 border-b pb-1">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              TO DO
            </h2>
            <span className="text-sm font-medium text-orange-500 dark:text-orange-400">
              {activeTodos.length} of {totalTasks}
            </span>
          </div>

          {activeTodos.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-3">
              No tasks to do! 🎉
            </p>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence>
                {activeTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* COMPLETED Section with counter */}
        <div>
          <div className="flex items-center justify-between mb-3 border-b pb-1">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              COMPLETED
            </h2>
            <span className="text-sm font-medium text-green-500 dark:text-green-400">
              {completedTasks} of {totalTasks}
            </span>
          </div>

          {completedTodos.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-3">
              No completed tasks yet!
            </p>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence>
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
