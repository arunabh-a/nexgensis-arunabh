// Mock API - uses localStorage

import { DEFAULT_BOOKS, STORAGE_KEY, DELAY_MS } from "../lib/constants";
import type { Book, BookFormData } from "../lib/types";

const delay = (ms = DELAY_MS) => new Promise((r) => setTimeout(r, ms));

// Helpers

function readStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function writeStorage(books: Book[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {
        // silently fail if storage is unavailable
    }
}

function getBooks() {
    const stored = readStorage();
    if (!stored) {
        writeStorage(DEFAULT_BOOKS);
        return [...DEFAULT_BOOKS];
    }
    return stored;
}

// Methods - API

export const api = {
    /** Fetch all books */
    async getAll() {
        await delay();
        return getBooks();
    },

    /** Create a new book */
    async create(data: BookFormData): Promise<Book> {
        await delay(250);
        const books = getBooks();
        const newBook: Book = {
            ...data,
            id: Date.now().toString(),
            year: Number(data.year),
        };
        writeStorage([...books, newBook]);
        return newBook;
    },

    /** Update an existing book by id */
    async update(id: string, data: BookFormData): Promise<Book> {
        await delay(250);
        const books = getBooks();
        const idx = books.findIndex((b: Book) => b.id === id);
        if (idx === -1) throw new Error(`Book ${id} not found`);
        const updated: Book = {
            ...books[idx],
            ...data,
            id,
            year: Number(data.year),
        };
        books[idx] = updated;
        writeStorage(books);
        return updated;
    },

    /** Delete a book by id */
    async delete(id: string): Promise<true> {
        await delay(200);
        const books = getBooks();
        writeStorage(books.filter((b: Book) => b.id !== id));
        return true;
    },
};
