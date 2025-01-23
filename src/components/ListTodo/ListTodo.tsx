import React, { useEffect } from "react";
import Item from "./Item/Item";
import { useTodoStore } from "../../store/Todo";

const ListTodo: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const getAllTask = useTodoStore((state) => state.getAllTask);

  useEffect(() => {
    getAllTask();
  }, [getAllTask]);

  return (
    <div>
      {todos.map((item) => (
        <Item key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default ListTodo;
