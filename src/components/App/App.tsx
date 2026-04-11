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
    const [page, setPage] = useState(1);

    const {data, isSuccess, isError}= useQuery({
        queryKey: ['notes', searchTodo, page],
        queryFn: ()=>fetchNotes(searchTodo, page),
        placeholderData: keepPreviousData,
    });

    const notes = data?.notes ?? [];

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    return (
      <div className={css.app}>
          <header className={css.toolbar}>
              <button className={css.button}>Create note +</button>
              {/* Компонент SearchBox */}
              {notes.length > 0 &&(<Pagination forcePage={page} onPageChange={handlePageChange} pageCount={data?.totalPages??0}/>)}
              {notes.length>0 && (<NoteList notes={notes} onDeleteNote={}/>)}
          </header>
      </div>
  )
}

