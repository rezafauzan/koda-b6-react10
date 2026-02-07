import React, { useEffect, useState } from "react"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { addTodoItem } from "./redux/reducers/todoReducer"

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
                <input ref={checkboxRef} type="checkbox" id="checkboxRef" name="todo" className="w-7 h-7" onChange={toggleStatus} />
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

const AddToDoForm = () => {
    const [todos, setTodos] = useState(null)
    const todoItems = useSelector(state => state.todoReducer)
    const dispatcher = useDispatch()
    useEffect(
        () => {
            setTodos(todoItems)
        }, [todoItems]
    )
    const { register, handleSubmit } = useForm()
    function addTodoFormHandler(data) {
        const todo = {
            id: todos.length,
            name: data.todoName,
            target: moment(data.todoTarget).format('DD MMMM YYYY HH:mm'),
            createdAt: moment().format('DD MMMM YYYY HH:mm'),
            doneAt: ""
        }
        dispatcher(addTodoItem(todo))
    }
    return (
        <form className="rounded bg-white shadow p-4 flex justify-center gap-4" onSubmit={handleSubmit(addTodoFormHandler)}>
            <div className="flex justify-center items-center gap-4">
                <div className="flex-1">
                    <label htmlFor="todoName">To Do Name :</label>
                    <input type="text" {...register("todoName")} id="todoName" className="outline-none border-b border-b-slate-400" placeholder="I need to do ..." required/>
                </div>
                <div className="flex-1">
                    <label htmlFor="todoTarget">When it should be done :</label>
                    <input type="datetime-local" {...register("todoTarget")} id="todoTarget" className="border-b border-b-slate-400" required/>
                </div>
                <button className="bg-slate-800 hover:bg-slate-400 flex-1 rounded py-4 text-white cursor-pointer">Submit</button>
            </div>
        </form>
    )
}

function App() {
    const [todos, setTodos] = useState(null)
    const todoItems = useSelector(state => state.todoReducer)
    useEffect(
        () => {
            setTodos(todoItems)
        }, [todoItems]
    )
    return (
        <div className="max-w-4xl w-full p-4 mx-auto my-4 flex flex-col gap-4">
            <section className="flex flex-col gap-4">
                <div className="section-header rounded bg-white shadow p-4 flex justify-center items-center">
                    <h1 className="text-xl font-bold">ToDo List React App</h1>
                </div>
                <AddToDoForm />
                <div className="section-body rounded bg-white shadow p-4 flex flex-col justify-center items-center gap-4">
                    <h1 className="w-full text-xl font-bold">To Do:</h1>
                    <ul className="w-full flex flex-col gap-4">
                        {
                            todos != null
                                ?
                                (
                                    todos.length < 1
                                        ?
                                        "Belum ada yang harus dilakukan!"
                                        :
                                        todos.map(
                                            (todo, index) => {
                                                return (
                                                    <li key={"todo-items-"+index}>
                                                        <TodoItem id={todo.id} todoName={todo.name} todoCreatedAt={todo.createdAt} todoDoneRefAt={todo.doneAt} todoTarget={todo.target} />
                                                    </li>
                                                )
                                            }
                                        )
                                )
                                :
                                ""
                        }
                    </ul>
                </div>
            </section >
        </div>
    )
}

export default App
