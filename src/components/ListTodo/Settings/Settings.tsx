import React, { useEffect, useState } from "react";
import style from "./Settimgs.module.css";
import { useTodoStore } from "../../../store/Todo";

const Settings: React.FC = () => {
  const deleteCompletedTask = useTodoStore((state) => state.deleteCompletedTask);
  const todos = useTodoStore((state) => state.todos);
    const [totalActiveTasks, setTotalActiveTasks] = useState<number>()

    useEffect(()=>{
        const sortedArr = todos.filter(item => !item.completed)
        setTotalActiveTasks(sortedArr.length)
    }, [todos])

  const onDelete = () => {
    deleteCompletedTask();
  };

  return (
    <div className={style.container}>
        <p>невыполненных задач: <b>{totalActiveTasks} шт</b> .</p>
      <button className={style.button} onClick={onDelete}>
        Удалить выполненные
      </button>
    </div>
  );
};

export default Settings;
