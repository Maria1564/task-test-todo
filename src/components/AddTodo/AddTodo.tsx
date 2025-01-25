import { useState } from "react"
import { useTodoStore } from "../../store/Todo"
import { Todo } from "../../types"
import style from "./AddTodo.module.css"
import Filter from "./Filter/Filter"
import React from "react"

const AddTodo = () => {
    const todos = useTodoStore(state => state.todos)
    const addTask = useTodoStore(state => state.addTask)
    const [inpValue, setInpValue] = useState<string>("")
    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInpValue(e.target.value)
    }

    const addNewTask = () => {
        if(inpValue.trim() === "") return
        const id = todos[todos.length-1] ? todos[todos.length - 1].id +1 : todos.length
        
        const newTask: Todo = {
            id,
            todo: inpValue,
            completed: false
        }

        addTask(newTask)

        setInpValue("")
    }

  return (
    <div className={style.container}>
        <Filter/>
        <input type="text" name="" id={style.todo} placeholder="new task" onChange={e => handlerChange(e)} value={inpValue}/>
        <button onClick={addNewTask} className={style.button}>Добавить</button>
    </div>
  )
}

export default AddTodo