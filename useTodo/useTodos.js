import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const useTodos = () => {

    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || []
    }

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => { //actualiza todos en almacenamiento local
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleNewTodo = (todo) => { //agregar
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action)
    }

    const handleDeleteTodo = (id) => { //eliminar
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        })
    }

    const handleToggleTodo = (id) => { //Marcar true o false
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })
    }

    return {
        todos,

        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,

        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        // pendingTodosCount,
    }
}
