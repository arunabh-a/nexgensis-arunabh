// Mock API - uses localStorage

import { DEFAULT_BOOKS, STORAGE_KEY, DELAY_MS } from "../lib/constants";

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

function writeStorage(books) {
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
    async create(data) {
        await delay(250);
        const books = getBooks();
        const newBook = {
            ...data,
            id: Date.now().toString(),
            year: parseInt(data.year, 10),
        };
        writeStorage([...books, newBook]);
        return newBook;
    },

    /** Update an existing book by id */
    async update(id, data) {
        await delay(250);
        const books = getBooks();
        const idx = books.findIndex((b) => b.id === id);
        if (idx === -1) throw new Error(`Book ${id} not found`);
        const updated = {
            ...books[idx],
            ...data,
            id,
            year: parseInt(data.year, 10),
        };
        books[idx] = updated;
        writeStorage(books);
        return updated;
    },

    /** Delete a book by id */
    async delete(id) {
        await delay(200);
        const books = getBooks();
        writeStorage(books.filter((b) => b.id !== id));
        return true;
    },
};
