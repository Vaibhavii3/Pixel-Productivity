import { useState, useEffect } from "react";
// import "../style/Daily.css";

const DAYS_IN_YEAR = 365;
const getTodayIndex = () => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const today = new Date();
  return Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
};

const DailyTasksStreak = () => {
  const [tasks, setTasks] = useState(Array(DAYS_IN_YEAR).fill(0));
  const todayIndex = getTodayIndex();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("taskStreaks")) || Array(DAYS_IN_YEAR).fill(0);
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("taskStreaks", JSON.stringify(tasks));
  }, [tasks]);

  const completeTask = () => {
    const newTasks = [...tasks];
    newTasks[todayIndex] = Math.min(newTasks[todayIndex] + 1, 5);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h1 className="title">Daily Tasks Streak</h1>
      <div className="streak-grid">
        {tasks.map((level, index) => (
          <div key={index} className={`streak-cell level-${level}`}></div>
        ))}
      </div>
      <button className="task-button" onClick={completeTask}>
        Complete Task for Today
      </button>
    </div>
  );
};

export default DailyTasksStreak;
