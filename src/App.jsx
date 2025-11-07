//todo app

import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  }

  function handleDelete(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function handleEdit(todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
  }

  function handleSaveEdit(id) {
    if (editingText.trim()) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
      setEditingText("");
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  function handleToggleComplete(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  return (
    <div className="min-h-screen w-full bg-linear-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 flex flex-col justify-between items-center p-6">
      <div className="bg-white/80 backdrop-blur-sm w-full max-w-lg rounded-2xl shadow-2xl p-8 mb-6">
        <h1 className="text-center font-serif font-extrabold text-4xl mb-6 text-indigo-700">
          📝 To-Do List
        </h1>

        <form
          className="flex items-center justify-center mb-8"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Add a new task..."
            className="flex-1 border-2 border-indigo-400 rounded-l-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-3 rounded-r-xl hover:bg-indigo-700 transition font-semibold"
          >
            Add
          </button>
        </form>

        <ol className="space-y-4">
          {todos.length === 0 && (
            <p className="text-center text-gray-600 italic">
              No tasks yet. Add one above! ✨
            </p>
          )}

          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {editingId === todo.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border-2 border-indigo-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id)}
                      className="w-5 h-5 accent-indigo-600 cursor-pointer"
                    />
                    <span
                      className={`text-lg ${
                        todo.completed
                          ? "line-through text-gray-400 italic"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      <footer className="bg-white/70 w-full text-center py-4 rounded-xl shadow-inner">
        <p className="text-gray-700 font-medium">
          © {new Date().getFullYear()} My Todo App. Created by{" "}
          <span className="text-indigo-600 font-semibold">
            Karthik Choudhary
          </span>
          .
        </p>
      </footer>
    </div>
  );
}

export default TodoList;
