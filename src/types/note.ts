export interface Note {
    id: number;
    title: string;
    content: string;
    tag: string;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface NewNote {
    id: number;
    title: string;
    content: string;
}
