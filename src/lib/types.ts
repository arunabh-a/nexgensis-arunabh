import type { ReactNode } from "react";

export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    year: number;
    rating: number;
    cover: string;
}

export interface BookFormData {
    title: string;
    author: string;
    genre: string;
    year: number;
    rating: number;
    cover: string;
}

export interface BookFormProps {
    initial?: Book | null;
    onSubmit: (data: BookFormData) => void;
    onCancel: () => void;
    loading?: boolean;
}

export interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: string) => Promise<void> | void;
}

export interface BookListItemProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: string) => Promise<void> | void;
}

export interface FilterBarProps {
    search: string;
    setSearch: (value: string) => void;
    genreFilter: string;
    setGenreFilter: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
    view: "grid" | "list";
    setView: (value: "grid" | "list") => void;
    books: Book[];
}

export interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export type ToastType = "success" | "error";

export interface ToastState {
    key: number;
    message: string;
    type: ToastType;
}

export interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onDismiss: () => void;
}
