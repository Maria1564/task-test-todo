import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// @ts-expect-error-next-line
import React from "react";

test("добавление задачи в список", () => {
  render(<App />);

  const input = screen.getByPlaceholderText("new task");
  const addButton = screen.getByText("Добавить");

  fireEvent.change(input, { target: { value: "Новая задача" } });
  fireEvent.click(addButton);

  fireEvent.change(input, { target: { value: "Новая задача2" } });
  fireEvent.click(addButton);

  expect(screen.getByText("Новая задача")).toBeInTheDocument();
});

test("отметка задачи как выполненной", () => {
  render(<App />);

  const task = screen.getByText("Новая задача");

  const completeButtons = screen.getAllByText("✔");
  fireEvent.click(completeButtons[0]);

  expect(task).toHaveClass("task_complete");
});

test("удаление задачи из списка", ()=>{
  render(<App />);
  const task = screen.getByText("Новая задача");
  const deleteButton = within(task.closest('.todo')!).getByText("Удалить");

  fireEvent.click(deleteButton);

  expect(screen.queryByText('Новая задача')).not.toBeInTheDocument();
  expect(screen.queryByText('Новая задача2')).toBeInTheDocument();
})