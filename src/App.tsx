import React from "react"
import AddTodo from "./components/AddTodo/AddTodo"
import ListTodo from "./components/ListTodo/ListTodo"


const  App: React.FC = () =>  {

  return (
    <div style={{margin: '50px auto 0', width: "max-content"}}>
      <h2 style={{maxWidth: "max-content", margin: '0 auto 20px'}}>TODO Лист</h2>
      <AddTodo/>
      <ListTodo/>
    </div>
  )
}

export default App
