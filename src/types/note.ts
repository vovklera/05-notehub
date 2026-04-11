export interface Note {
    id: number;
    title: string;
    content: string;
    tag: string;
}

export interface FetchNotesResponse {
    results: Note[];
    total_pages: number;
}

export interface NewNote {
    id: number;
    title: string;
    content: string;
}
