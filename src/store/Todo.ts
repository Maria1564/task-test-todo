import { create } from "zustand";
import { Todo } from "../types";
import axios from "axios";
import { persist } from "zustand/middleware";

type TodoStoreState = {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: "all" | "completed" | "active"
};

type TodoStoreActions = {
  getAllTask: () => void;
  getCompletedTask: () => void;
  getActiveTask: () => void;
  completeTask: (id: number) => void;
  removeCompleteTask: (id: number) => void;
  deleteSelectTask: (id: number) => void;
  addTask: (newTask: Todo) => void;
};

type TodoStore = TodoStoreState & TodoStoreActions;

export const useTodoStore = create<TodoStore>()(
  persist((set, get) => ({
    todos: [],
    filteredTodos: [],
    filter: "all",
    getAllTask: () => {
      if (get().todos.length && get().filter !== "all") {set(state => ({ todos: state.todos, filter: "all", filteredTodos: state.todos}))}
      else{
        axios
          .get("https://dummyjson.com/todos/user/54")
          .then(({ data }) => set({ todos: data.todos, filter: "all", filteredTodos: data.todos}));
      };
    },
    getCompletedTask: () =>
      set((state) => ({ filteredTodos: state.todos.filter((item) => item.completed), filter: "completed" })),
    getActiveTask: () =>
      set((state) => ({ filteredTodos: state.todos.filter((item) => item.completed === false), filter: "active" })),
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
    addTask: (newTask) => {
      console.log(newTask)
        if(get().filter === "completed") {
          set(state => ({todos: [...state.todos, newTask]}))
        }else{
          set(state => ({todos: [...state.todos, newTask], filteredTodos: [...state.todos, newTask]}))
        }
    },
  }), {name: 'todo-storage'} )
);
