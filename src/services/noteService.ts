import type {Note, FetchNotesResponse, NewNote} from "../types/note.ts";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (searchTodo: string, page: number = 1): Promise<FetchNotesResponse>=>{
    const response = await axios.get<FetchNotesResponse>("/notes",{
        params: {
            search: searchTodo,
            page
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        }
    })
    return response.data;
}

export const createNote = async (newNote: NewNote): Promise<Note> => {
    const response = await axios.post<Note>("/notes", newNote);
    return response.data;
}

export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${noteId}`);
    return response.data;
}