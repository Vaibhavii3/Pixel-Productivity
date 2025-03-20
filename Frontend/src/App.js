import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./Pages/Todo";
import Home from "./Pages/Home";
import QuickNotes from "./Pages/QuickNotes";
import PomodoroTimer from "./Pages/PomodoroTimer";
import DailyTasks from "./Pages/DailyTasks";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /> </ProtectedRoute>} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/quick" element={<QuickNotes />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/daily" element={<DailyTasks />} />
      </Routes>  
    </Router>
    
  );
}

export default App;
