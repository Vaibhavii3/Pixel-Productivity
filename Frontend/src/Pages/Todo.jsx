import { useState, useEffect } from "react";
import axios from "axios";
import "../style/todo.css";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/notes`;

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(API_URL);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (input.trim()) {
            try {
                const response = await axios.post(API_URL, { content: input });
                setTasks([...tasks, response.data]);
                setInput("");
            } catch (error) {
                console.log("Error adding task:", error);
            }
        }
    };

    const toggleTask = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, done: !task.done } : task
        );
        setTasks(newTasks);
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="box">
        <div className="todo-container">
            <h1 className="todo-title">Pixel Todo</h1>
            <div className="todo-input-container">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />
                <button className="todo-button" onClick={addTask}>Add</button>    
            </div>
            <ul className="todo-task-list">
                {tasks.map((task) => (
                    <li key={task._id} className="todo-task-item">
                        <span 
                            className={`todo-task-text ${task.done ? 'todo-task-done' : ''}`}
                            onClick={() => toggleTask(task)}
                        >
                            {task.content}
                        </span>
                        <button 
                            className="todo-delete-button"
                            onClick={() => deleteTask(task._id)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </div>    
    );
}

export default Todo;