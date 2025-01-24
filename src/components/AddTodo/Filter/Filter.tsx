import React from "react";
import { useTodoStore } from "../../../store/Todo";
import style from "./Filter.module.css"

const Filter = () => {
    const {filter, getAllTask, getCompletedTask, getActiveTask} = useTodoStore()
    
  return (
    <div className={style.group_btn}>
      <span>Select filter: </span>
      <button className={`${filter === "all" ? style.active_filter : ""} ${style.btn}`} onClick={getAllTask}>all</button>
      <button className={`${filter === "completed" ? style.active_filter : ""} ${style.btn}`} onClick={getCompletedTask}>completed</button>
      <button className={`${filter === "active" ? style.active_filter : ""} ${style.btn}`} onClick={getActiveTask}>active</button>
    </div>
  );
};

export default Filter;
