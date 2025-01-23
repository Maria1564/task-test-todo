import React from "react";
import { Todo } from "../../../types";
import style from "./Item.module.css";
import { useTodoStore } from "../../../store/Todo";

type ItemProps = {
  todo: Todo;
};

const Item: React.FC<ItemProps> = ({ todo }) => {
  const { completeTask, removeCompleteTask, deleteSelectTask } = useTodoStore();

  return (
    <div className={style.todo}>
      <p className={todo.completed ? style.task_complete : ""}>{todo.todo}</p>
      <div className={style.actions}>
        {todo.completed ? (
          <button
            className={`${style.btn} ${style.undo}`}
            onClick={() => removeCompleteTask(todo.id)}
          >
            ✘
          </button>
        ) : (
          <button
            className={`${style.btn} ${style.complete}`}
            onClick={() => completeTask(todo.id)}
          >
            ✔
          </button>
        )}
        <button
          className={`${style.btn} ${style.delete}`}
          onClick={() => deleteSelectTask(todo.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default React.memo(Item);
