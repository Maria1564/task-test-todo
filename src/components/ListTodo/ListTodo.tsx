import React, { useEffect } from "react";
import Item from "./Item/Item";
import { useTodoStore } from "../../store/Todo";

const ListTodo: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const filteredTodos = useTodoStore((state) => state.filteredTodos);
  const filter = useTodoStore((state) => state.filter);
  const getAllTask = useTodoStore((state) => state.getAllTask);
  
  useEffect(() => {
    getAllTask();
  }, [getAllTask]);

  
      console.log("todos >> ", todos, "filterTodo >> ", filteredTodos)
  return (
    <div>
      {filter=== "all" ? todos.map((item) => (
        <Item key={item.id} todo={item} />
      )) : filteredTodos.map((item) => (
        <Item key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default ListTodo;
