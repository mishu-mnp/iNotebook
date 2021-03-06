import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAddClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Notes Added Successfully!", "success")
    }

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container" style={{ marginTop: "15px" }}>
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={handleOnChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleOnChange} minLength={3} required />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary" onClick={handleAddClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
