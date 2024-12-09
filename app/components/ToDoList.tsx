"use client";
import { useState, useEffect } from "react";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  markDone,
  markIncomplete,
} from "@/app/actions";
import TodoItem from "@/app/components/ToDoListItem";
import posthog from 'posthog-js';

/**
 * We try to infer the type returned by the `getItems` function which is async/a promise.
 */
type ToDoListType = Awaited<ReturnType<typeof getItems>>;

export default function ToDoList({
  todosInitial,
}: {
  todosInitial: ToDoListType;
}) {
  const [todos, setTodos] = useState<ToDoListType>(todosInitial);
  const [newTodo, setNewTodo] = useState("");
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    // Access localStorage only on client-side
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []); // Empty dependency array - runs once on mount

  const handleToggle = async (id: string) => {
    const item = todos.find((todo) => todo.id === id);
    if (item) {
      if (item.completed) {
        await markIncomplete(id);
        //TODO: MarkIncomplete event tracking
        posthog.capture('MarkIncomplete', { id: id });
      } else {
        await markDone(id);
        //TODO: MarkDone event tracking
        posthog.capture('MarkDone', { id: id });
      }
      setTodos(await getItems());
    }
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setTodos(await getItems());
    //TODO: DeleteTodo event tracking
    posthog.capture('DeleteTodo', { id: id });
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await createItem(newTodo.trim());
      setTodos(await getItems());
      setNewTodo("");
      //TODO: AddTodo event tracking
      posthog.capture('AddTodo', { todo: newTodo.trim() });
      console.log('Added new todo:', newTodo.trim());
    }
  };

  const handleEdit = async (id: string, text: string) => {
    await updateItem(id, text);
    setTodos(await getItems());
    //TODO: EditTodo event tracking
    posthog.capture('EditTodo', { id: id, text: text });
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    //TODO: Logout event tracking
    posthog.capture('Logout', { event: 'User Logout'});
    window.location.href = '/';
  };

  return (
    <div className="grow max-w-4xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="flex items-center gap-2">
          <svg 
            className="h-6 w-6 text-gray-600" 
            fill="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            />
          </svg>
          <span className="text-gray-600">{username}</span>
          <button
            onClick={handleLogout}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="Logout"
          >
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr className="border-t border-gray-200 mb-6" />
      <form onSubmit={handleAddTodo} className="flex mb-4 shadow-lg">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="grow rounded-l-lg p-2 text-black outline-none cursor-pointer"
        />
        <button type="submit" className="rounded-r-lg bg-blue-600 p-2 text-white">
          Add
        </button>
      </form>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}
