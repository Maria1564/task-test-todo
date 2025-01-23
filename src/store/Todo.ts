import { create } from "zustand";
import { Todo } from "../types";
import axios from "axios";

type TodoStoreState = {
  todos: Todo[];
};

type TodoStoreActions = {
  getAllTask: () => void;
  getCompletedTask: () => void;
  getActiveTask: () => void;
  completeTask: (id: number) => void;
  removeCompleteTask: (id: number) => void;
  deleteSelectTask: (id: number) => void;
};

type TodoStore = TodoStoreState & TodoStoreActions;

export const useTodoStore = create<TodoStore>()((set) => ({
  todos: [],
  getAllTask: () => {
    axios
      .get("https://dummyjson.com/todos/user/54")
      .then(({ data }) => set({ todos: data.todos }));
  },
  getCompletedTask: () =>
    set((state) => ({ todos: state.todos.filter((item) => item.completed) })),
  getActiveTask: () =>
    set((state) => ({ todos: state.todos.filter((item) => !item.completed) })),
  completeTask: (id) =>
    set((state) => ({
      todos: state.todos.map((item) => {
        if (item.id === id) item.completed = true;
        return item;
      }),
    })),
  removeCompleteTask: (id) =>
    set((state) => ({
      todos: state.todos.map((item) => {
        if (item.id === id) item.completed = false;
        return item;
      }),
    })),
  deleteSelectTask: (id) =>
    set((state) => ({ todos: state.todos.filter((item) => item.id !== id) })),
}));
