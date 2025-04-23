import React, { useEffect } from "react";
import { TodoProvider } from "./components/contexts/TodoContext";
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  // console.log(todos);

  // const allTodos = todos.map((curTodo) => curTodo.todo);
  // console.log(allTodos)

  // const upper = allTodos.map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())
  // console.log(upper)
  //? setTodos(upper)  can't directly pass to the upper to the setTodos bcz upper is
  // ? array of string while setTodos is array of objects.|Means different data structure

  // ? .... addTodo functionality
  const addTodo = (todo) => {
    const capitalizedTodo =
      todo.todo.charAt(0).toUpperCase() + todo.todo.slice(1).toLowerCase();

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...todo,
        todo: capitalizedTodo, // override with capitalized
      },
    ]);
  };

  //?..... update functionality
  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  // ?..... delete functioanlity
  const deletedTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  // ?..... toggle functionality
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }

    // console.log(todos)
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updatedTodo, deletedTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm todos={todos} />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}

            {todos &&
              todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
