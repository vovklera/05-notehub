import css from './App.module.css'
import NoteList from "../NoteList/NoteList.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchNotes} from "../../services/noteService.ts"
import type {Note} from "../../types/note.ts";
import {useState} from "react";
import Pagination from "../Pagination/Pagination.tsx";

export default function App() {
    const [searchTodo, setSearchTodo] = useState("");

    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    const {data, isSuccess, isError}= useQuery({
        queryKey: ['notes', searchTodo],
        queryFn: ()=>fetchNotes(searchTodo),
        placeholderData: keepPreviousData,
    });

    const notes = data?.results ?? [];

    return (
      <div className={css.app}>
          <header className={css.toolbar}>
              {/* Компонент SearchBox */}
              {notes.length > 0 &&(<Pagination forcePage={} pageCount={} onPageChange={}/>)}
              {notes.length>0 && (<NoteList notes={notes} onDeleteNote={}/>)}
          </header>
      </div>
  )
}

