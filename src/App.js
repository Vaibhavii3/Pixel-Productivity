import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./Pages/Todo";
import Home from "./Pages/Home";
import QuickNotes from "./Pages/QuickNotes";
import PomodoroTimer from "./Pages/PomodoroTimer";
import DailyTasks from "./Pages/DailyTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/quick" element={<QuickNotes />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/daily" element={<DailyTasks />} />
      </Routes>  
    </Router>
    
  );
}

export default App;
