import css from "./NoteList.module.css";
import type {Note} from "../../types/note.ts";
import {useMutation} from "@tanstack/react-query";
import {deleteNote} from "../../services/noteService.ts";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({notes}: NoteListProps) {
    const mutation = useMutation({
        mutationFn: deleteNote
    })

    return (
        <ul className={css.list}>
            {notes.map((note: Note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button className={css.button} onClick={()=> mutation.mutate(note.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}