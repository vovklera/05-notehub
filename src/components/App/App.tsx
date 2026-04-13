import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchNotes} from "../../services/noteService.ts"

import css from './App.module.css'
import toast, {Toaster} from "react-hot-toast";

import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Modal from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";


export default function App() {
    const [page, setPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);

    const [searchTodo, setSearchTodo] = useState("");
    const handleSearch = useDebouncedCallback((e:string)=>{
        setSearchTodo(e)
    }, 300);

    const perPage = 12;

    const {data, isLoading, isSuccess, isError}= useQuery({
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
    }

    useEffect(() => {
        if (isSuccess && data?.notes.length === 0){
            toast.error("No notes found for your request.");
            return;
        }
    },[data, isSuccess])

    return (
      <div className={css.app}>
          <header className={css.toolbar}>
              {<SearchBox onSearch={handleSearch} />}
              {isSuccess && data?.totalPages > 1 &&(
                  <Pagination
                      forcePage={page}
                      onPageChange={handlePageChange}
                      pageCount={data?.totalPages??0}
                  />
              )}
              <button className={css.button} onClick={()=> setModalOpen(true)}>Create note +</button>
          </header>
          {isLoading && <Loader/>}
          {isError && <ErrorMessage/>}
          <Toaster position={"top-center"}/>
              {notes.length>0 && (<NoteList notes={notes}/>)}
              {isModalOpen && (
                  <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal}/>
                  </Modal>
              )}
      </div>
  )
}