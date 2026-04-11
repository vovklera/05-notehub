import css from "./NoteList.module.css";
import type {Note} from "../../types/note.ts";

interface NoteListProps {
    notes: Note[];
    onDeleteNote: (note: Note) => void;
}

export default function NoteList({notes, onDeleteNote}: NoteListProps) {
    return (
        <ul className={css.list}>
            {notes.map((note: Note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button className={css.button} onClick={()=>onDeleteNote(note)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}