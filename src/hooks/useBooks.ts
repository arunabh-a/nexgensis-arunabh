import { useState, useEffect, useCallback } from "react";
import { api } from "../service/api";

export function useBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.getAll();
            setBooks(data);
        } catch (err) {
            setError(err.message || "Failed to load books. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // Create
    const addBook = useCallback(async (data) => {
        setActionLoading(true);
        try {
            const created = await api.create(data);
            setBooks((prev) => [...prev, created]);
            return { success: true, book: created };
        } catch (err) {
            return {
                success: false,
                error: err.message || "Failed to add book.",
            };
        } finally {
            setActionLoading(false);
        }
    }, []);

    // Update
    const updateBook = useCallback(async (id, data) => {
        setActionLoading(true);
        try {
            const updated = await api.update(id, data);
            setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
            return { success: true, book: updated };
        } catch (err) {
            return {
                success: false,
                error: err.message || "Failed to update book.",
            };
        } finally {
            setActionLoading(false);
        }
    }, []);

    // Delete
    const deleteBook = useCallback(async (id) => {
        try {
            await api.delete(id);
            setBooks((prev) => prev.filter((b) => b.id !== id));
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.message || "Failed to delete book.",
            };
        }
    }, []);

    return {
        books,
        loading,
        actionLoading,
        error,
        fetchBooks,
        addBook,
        updateBook,
        deleteBook,
    };
}
