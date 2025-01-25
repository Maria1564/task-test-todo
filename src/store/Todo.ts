import { create } from "zustand";
import { Todo } from "../types";
import axios from "axios";
import { persist } from "zustand/middleware";

type TodoStoreState = {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: "all" | "completed" | "active";
};

type TodoStoreActions = {
  getAllTask: () => void;
  getCompletedTask: () => void;
  getActiveTask: () => void;
  completeTask: (id: number) => void;
  removeCompleteTask: (id: number) => void;
  deleteSelectTask: (id: number) => void;
  addTask: (newTask: Todo) => void;
  deleteCompletedTask: () => void;
};

type TodoStore = TodoStoreState & TodoStoreActions;

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filteredTodos: [],
      filter: "all",
      getAllTask: () => {
        if (
          (get().todos.length || localStorage.getItem("todo-storage")) &&
          get().filter !== "all"
        ) {
          set((state) => ({
            todos: state.todos,
            filter: "all",
            filteredTodos: state.todos,
          }));
        } else if (!localStorage.getItem("todo-storage")) {
          axios.get("https://dummyjson.com/todos/user/54").then(({ data }) =>
            set({
              todos: data.todos,
              filter: "all",
              filteredTodos: data.todos,
            })
          );
        }
      },
      getCompletedTask: () =>
        set((state) => ({
          filteredTodos: state.todos.filter((item) => item.completed),
          filter: "completed",
        })),
      getActiveTask: () =>
        set((state) => ({
          filteredTodos: state.todos.filter((item) => item.completed === false),
          filter: "active",
        })),
      completeTask: (id) =>
        set((state) => ({
          todos: state.todos.map((item) => {
            if (item.id === id) item.completed = true;
            return item;
          }),
          filteredTodos: state.filteredTodos.filter((item) => item.id !== id),
        })),
      removeCompleteTask: (id) =>
        set((state) => ({
          todos: state.todos.map((item) => {
            if (item.id === id) item.completed = false;
            return item;
          }),
          filteredTodos: state.filteredTodos.filter((item) => item.id !== id),
        })),
      deleteSelectTask: (id) =>
        set((state) => ({
          todos: state.todos.filter((item) => item.id !== id),
          filteredTodos: state.filteredTodos.filter((item) => item.id !== id),
        })),
      addTask: (newTask) => {
        if (get().filter === "completed") {
          set((state) => ({ todos: [...state.todos, newTask] }));
        } else if (get().filter === "active") {
          set((state) => ({
            todos: [...state.todos, newTask],
            filteredTodos: [...state.filteredTodos, newTask],
          }));
        } else {
          set((state) => ({
            todos: [...state.todos, newTask],
            filteredTodos: [...state.todos, newTask],
          }));
        }
      },
      deleteCompletedTask: () =>
        set((state) => ({
          ...state,
          todos: state.todos.filter((item) => !item.completed),
          filteredTodos: state.filteredTodos.filter((item) => !item.completed),
        })),
    }),
    { name: "todo-storage" }
  )
);
