import React, { useState, useEffect } from "react"
import Form from "./components/Form"
import "./App.css"
import TodoList from "./components/TodoList"

function App() {
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all")
  const [filtred, setFiltred] = useState([])
  //Only run once
  useEffect(() => {
    getLocalTodos()
  }, []);
  //useEffect
  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case "completed":
          setFiltred(todos.filter((todo) => todo.completed === true))
          break
        case "uncompleted":
          setFiltred(todos.filter((todo) => todo.completed === false))
          break
        default:
          setFiltred(todos)
          break
      }
    }
    filterHandler();
    saveLocalStorage();
  }, [todos, status])
  // local storage:
  const saveLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]))
    } else {
      let todolocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todolocal)
    }
  }
  
  

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setStatus={setStatus}
      />
      <TodoList
        filtred={filtred}
        setTodos={setTodos}
        todos={todos}
        inputText={inputText}
      />
    </div>
  )}

export default App
