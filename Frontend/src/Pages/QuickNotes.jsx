import { useEffect, useState } from "react";
import axios from "axios";
import "../style/quickNotes.css";

const API_URL = "http://localhost:5000/api/quicknotes";

function QuickNotes() {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchQuickNotes = async () => {
            try {
                const response = await axios.get(API_URL);
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        fetchQuickNotes();
    }, []);

    //function to add a new note
    const addNote = async () => {
        if (note.trim()) {
            try {
                const response = await axios.post(API_URL, {
                    notes: note });
                setNotes([...notes, response.data]);
                setNote("");
            } catch (error) {
                console.log("Error adding Note:", error);
            }
        }
    };

    //function to delete a note
    const deleteNote = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
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
                    {notes.map((note) => (

                        <li key={note._id} className="quick-task-item">
                            <span className="quick-task-text">{note.notes}</span>

                            <button className="quick-delete-button" onClick={() => deleteNote(note._id)}>🔥 Delete</button>
                            
                        </li>
                    ))}
                </ul>

            </div>
                    </>
    );
}

export default QuickNotes;