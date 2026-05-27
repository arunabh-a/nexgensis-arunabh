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
