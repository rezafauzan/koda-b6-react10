import React, { useEffect, useState } from "react"
import moment from "moment"
import { useSelector } from "react-redux"

const TodoItem = ({ id, todoName, todoCreatedAt, todoDoneAt, todoTarget }) => {
    const checkboxRef = React.useRef()
    const todoNameRef = React.useRef()
    const todoDoneRef = React.useRef()
    function toggleStatus() {
        if (checkboxRef.current.checked) {
            todoNameRef.current.classList.add('line-through')
            todoDoneRef.current.textContent = moment().format('DD-MM-YYYY hh:mm:ss')
        } else {
            todoNameRef.current.classList.remove('line-through')
            todoDoneRef.current.textContent = ''
        }
    }
    return (
        <label>
            <div className="flex gap-4 flex-1">
                <input ref={checkboxRef} type="checkboxRef" id="checkboxRef" name="todo" className="w-7 h-7" onChange={toggleStatus} />
                <span ref={todoNameRef}>{todoName}</span>
            </div>
            <div className="flex flex-col pl-16 flex-1">
                <div className="flex">
                    <span className="font-bold w-50">Tanggal dibuat:</span>
                    <span className="flex">{todoCreatedAt}</span>
                </div>
                <div className="flex">
                    <span className="font-bold w-50">Target selesai:</span>
                    <span className="flex">{todoTarget}</span>
                </div>
                <div className="flex">
                    <span className="font-bold w-50">Selesai pada:</span>
                    <span ref={todoDoneRef} className="flex">{todoDoneAt}</span>
                </div>
            </div>
        </label>
    )
}

function App() {
    const [todos, setTodos] = useState(null)
    const todoItems = useSelector(state => state.todoReducer)
    useEffect(
        ()=>{
            setTodos(todoItems)
        }, [todoItems]
    )
    return (
        <section>
            <div className="container w-3xl p-4 mx-auto my-4 flex flex-col gap-4">
                <div className="section-header rounded bg-white shadow p-4 flex justify-center items-center">
                    <h1 className="text-xl font-bold">ToDo List React App</h1>
                </div>
                <div className="section-body rounded bg-white shadow p-4 flex flex-col justify-center items-center gap-4">
                    <h1 className="w-full text-xl font-bold">To Do:</h1>
                    <ul className="w-full flex flex-col gap-4">
                        {
                            todos != null
                                ?
                                todos.map(
                                    todo => {
                                        return (
                                            <li>
                                                <TodoItem id={todo.id} todoNameRef={todo.name} todoCreatedAt={todo.createdAt} todoDoneRefAt={todo.doneAt} todoTarget={todo.target} />
                                            </li>
                                        )
                                    }
                                )
                                :
                                ""
                        }
                    </ul>
                </div>
            </div>
        </section >
    )
}

export default App
