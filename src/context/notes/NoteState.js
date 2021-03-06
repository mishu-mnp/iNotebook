import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)


    // Get All Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MzBhNDNmOWY3YmU2MWQ4Nzg5Y2I2In0sImlhdCI6MTYzMTg2MDkwN30.6uZQBugCsuQRsxh4O0hVE3O9S7CZSWAzU7cBgaBN9Aw'
            },
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)
    }


    // Add Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MzBhNDNmOWY3YmU2MWQ4Nzg5Y2I2In0sImlhdCI6MTYzMTgxMTE4Nn0.Md_730u_jgCZMSfABhjeYf9c3Kre0TWtKKeVGcDax54'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json()
        setNotes(notes.concat(note));
    }


    // Delete Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MzBhNDNmOWY3YmU2MWQ4Nzg5Y2I2In0sImlhdCI6MTYzMTgxMTE4Nn0.Md_730u_jgCZMSfABhjeYf9c3Kre0TWtKKeVGcDax54'
            }
        });
        const json = await response.json();
        // console.log(json)

        console.log("Deleting node with ID : ", id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    // Edit or Update Note
    const updateNote = async (id, title, description, tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MzBhNDNmOWY3YmU2MWQ4Nzg5Y2I2In0sImlhdCI6MTYzMTgxMTE4Nn0.Md_730u_jgCZMSfABhjeYf9c3Kre0TWtKKeVGcDax54'
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit at client side
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;