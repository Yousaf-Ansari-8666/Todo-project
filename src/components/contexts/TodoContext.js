import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo_msg: " learn js",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updatedTodo: (id, todo) => {},
  deletedTodo: (id) => {},
  toggleComplete: (id) => {}, 
});

export const TodoProvider = TodoContext.Provider

export const useTodo = () => {
  return useContext(TodoContext);
};
