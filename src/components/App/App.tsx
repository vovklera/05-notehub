import css from './App.module.css'
import NoteList from "../NoteList/NoteList.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchNotes} from "../../services/noteService.ts"
// import type {Note} from "../../types/note.ts";
import {useState} from "react";
import Pagination from "../Pagination/Pagination.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Modal from "../Modal/Modal.tsx";
import {useDebouncedCallback} from "use-debounce";
import NoteForm from "../NoteForm/NoteForm.tsx";

export default function App() {
    // const [isSelectedNote, setSelectedNote] = useState<Note | null>(null)
    const [page, setPage] = useState(1);

    const [isModalOpen, setModalOpen] = useState(false);

    const [searchTodo, setSearchTodo] = useState("");
    const handleSearch = useDebouncedCallback((e:string)=>{
        setSearchTodo(e)
    }, 300); // спитати навіщо ми тут передам е якщо воно і без нього так само працювало

    const perPage = 12;

    const {data}= useQuery({
        queryKey: ['notes', searchTodo, page, perPage],
        queryFn: ()=>fetchNotes(searchTodo, page, perPage),
        placeholderData: keepPreviousData,
    });

    const notes = data?.notes ?? [];

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    const closeModal = () => {
        setModalOpen(false);
        // setSelectedNote(null);
    }

    return (
      <div className={css.app}>
          <header className={css.toolbar}>
              {<SearchBox onSearch={handleSearch} />}
              {notes.length > 0 &&(<Pagination forcePage={page} onPageChange={handlePageChange} pageCount={data?.totalPages??0}/>)}
              <button className={css.button}>Create note +</button>
          </header>
              {notes.length>0 && (<NoteList notes={notes}/>)}
              {isModalOpen && (
                  <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal}/>
                  </Modal>
              )}
      </div>
  )
}

