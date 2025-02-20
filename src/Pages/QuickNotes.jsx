import { useEffect, useState } from "react";
import "../style/quickNotes.css";

function QuickNotes() {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("quickNotes"));
        setNotes(savedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem("quickNotes", JSON.stringify(notes));
    }, [notes]);

    //function to add a new note
    const addNote = () => {
        if (note.trim() !== "") {
            setNotes([...notes, note]);
            setNote("");
        }
    };

    //function to delete a note
    const deleteNote = (index) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };

    return (
        <>
        <div className="quick-container">
            <h1 className="quick-title">🔥 Quick Notes 🔥</h1>
            <div className="quick-input-container">
                <textarea
                    className="quick-input"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write a quick note..."
                    />
                <button className="quick-button" onClick={addNote}> Add</button>
            </div>

        </div>
            <div className="quick-result">
                <ul className="quick-task-list">
                    {notes.map((note, index) => (

                        <li key={index} className="quick-task-item">
                            <span className="quick-task-text">{note}</span>

                            <button className="quick-delete-button" onClick={() => deleteNote(index)}>🔥 Delete</button>
                            
                        </li>
                    ))}
                </ul>

            </div>
                    </>
    );
}

export default QuickNotes;