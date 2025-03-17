import "../style/pomodoro.css";
import { useState, useEffect } from "react";

function PomodoroTimer() {
    const [workDuration, setWorkDuration] = useState(25 * 60);
    const [breakDuration, setBreakDuration] = useState(5 * 60);
    const [longBreakDuration, setLongBreakDuration] = useState(15 * 60);
    const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);

    const [time, setTime] = useState(workDuration); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsRunning(false);

                        if (!isBreak) {
                            setSessionCount((prevCount) => prevCount + 1);
                        }

                        // switch to break or next work session

                        if (isBreak) {
                            setTime(workDuration);
                            setIsBreak(false);
                        } else {
                            if ((sessionCount + 1 ) % sessionsBeforeLongBreak === 0) {
                                setTime(longBreakDuration);
                            } else {
                                setTime(breakDuration);
                            }
                            setIsBreak(true);
                        }

                        return isBreak ? workDuration : (sessionCount + 1) % sessionsBeforeLongBreak === 0 ? longBreakDuration : breakDuration;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, isBreak, workDuration, breakDuration, longBreakDuration, sessionsBeforeLongBreak, sessionCount]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(workDuration);
        setIsBreak(false);
        setSessionCount(0);
    };

    const handleSetWorkTime = (minutes) => {
        setWorkDuration(minutes * 60);
        setTime(minutes * 60);
        setIsBreak(false);
    };

    const handleCustomTime = (e) => {
        let minutes = parseInt(e.target.value, 10);
        if (!isNaN(minutes) && minutes > 0) {
            setWorkDuration(minutes * 60);
            setTime(minutes * 60);
            setIsBreak(false);
        }
    };

    const handleCustomBreakTime = (e) => {
        let minutes = parseInt(e.target.value, 10);
        if (!isNaN(minutes) && minutes > 0) {
            setBreakDuration(minutes * 60);
        }
    };

    const handleCustomLongBreakTime = (e) => {
        let minutes = parseInt(e.target.value, 10);
        if (!isNaN(minutes) && minutes > 0) {
            setLongBreakDuration(minutes * 60);
        }
    };

    const handleCustomSessions = (e) => {
        let sessions = parseInt(e.target.value, 10);
        if (!isNaN(sessions) && sessions > 0) {
            setSessionsBeforeLongBreak(sessions);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="pomo-container">
            <h1 className="pomo-title">Pomodoro Timer</h1>


            {/* Mode indicator */}
            <div className="mode-box">
                <div className={`mode-indicator ${isBreak ? 'break-mode' : 'work-mode'}`}>
                    {isBreak ? (sessionCount % sessionsBeforeLongBreak === 0 ? "LONG BREAK" : "SHORT BREAK") : "WORK TIME"}
                </div>

                {/* Progress Indicator */}
                <p className="session-font">Session: {sessionCount}/{sessionsBeforeLongBreak}</p> 
            </div>

            <div className="pomo-timer">{formatTime(time)}</div>

            <div className="pomo-buttons">
                <button className="pomo-button" onClick={handleStart}>Start</button>
                <button className="pomo-button" onClick={handlePause}>Pause</button>
                <button className="pomo-button" onClick={handleReset}>Reset</button>
            </div>

            <div className="pomo-settings">

                <div className="work-box">

                <div className="work">
                    <label> Work Duration: </label>
                    <button onClick={() => handleSetWorkTime(25)} className="set-button"> 25 min </button>

                    <button onClick={() => handleSetWorkTime(50)} className="set-button"> 50 min </button>

                    <input type="number" placeholder="Custom min" onChange={handleCustomTime} className="custom-button" />
                </div>

                <div className="break">
                    <label>Break Duration:</label>
                    <input type="number" placeholder="Custom min" onChange={handleCustomBreakTime} className="custom-button" />
                </div>
                </div>

                <div className="break-box">

                <div className="long-break">
                    <label>Long Break Duration:</label>
                    <input type="number" placeholder="Custom min" onChange={handleCustomLongBreakTime} className="custom-button" />
                </div>

                <div className="session-box">
                    <label>Sessions before Long Break:</label>
                    <input type="number" placeholder="Default: 4" onChange={handleCustomSessions} className="custom-button" />
                </div>
                </div>

            </div>
        </div>
    );
};

export default PomodoroTimer;