import React, { useState } from "react";
import { useTodo } from "./contexts/TodoContext";

function TodoForm({ todos }) {
  const [todo, setTodo] = useState("");

  const allTodos = todos.map((curTodo) => curTodo.todo); 

  const dulplicate = allTodos.some((value) => value.toLowerCase().trim() === todo.toLowerCase().trim());
  // console.log(dulplicate)

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (dulplicate) {
       console.log("dulplicate exists");
      setTodo("");
    } else if (!todo) return;
    else {
      addTodo({ todo, completed: false });
      setTodo("");
    }
  };

  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
