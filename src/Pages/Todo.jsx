import { useState } from "react";
import "../style/todo.css";
// import "./style/char.css";

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    const addTask = () => {
        if (input.trim()) {
            setTasks([...tasks, { text: input, done: false }]);
            setInput("");
        }
    };

    const toggleTask = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, done: !task.done } : task
        );
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
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
                {tasks.map((task, index) => (
                    <li key={index} className="todo-task-item">
                        <span 
                            className={`todo-task-text ${task.done ? 'todo-task-done' : ''}`}
                            onClick={() => toggleTask(index)}
                        >
                            {task.text}
                        </span>
                        <button 
                            className="todo-delete-button"
                            onClick={() => deleteTask(index)}
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