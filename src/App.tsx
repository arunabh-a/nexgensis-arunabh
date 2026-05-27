import { useState } from "react";
import { useBooks } from "./hooks/useBooks";
import { useFilters } from "./hooks/useFilters";
import { useToast, Toast } from "./components/Toast";
import { Modal } from "./components/Modal";
import { BookForm } from "./components/BookForm";
import { BookCard } from "./components/BookCard";
import { BookListItem } from "./components/BookListItem";
import { FilterBar } from "./components/FilterBar";
import type { Book, BookFormData } from "./lib/types";

export default function App() {
    const {
        books,
        loading,
        actionLoading,
        error,
        fetchBooks,
        addBook,
        updateBook,
        deleteBook,
    } = useBooks();
    const {
        search,
        setSearch,
        genreFilter,
        setGenreFilter,
        sortBy,
        setSortBy,
        filtered,
        clearFilters,
        isFiltered,
    } = useFilters(books);
    const { toast, showToast, dismissToast } = useToast();

    const [modal, setModal] = useState<Book | "add" | null>(null);
    const [view, setView] = useState<"grid" | "list">("grid");

    // Handlers 

    const handleAdd = async (data: BookFormData) => {
        const result = await addBook(data);
        if (result.success) {
            setModal(null);
            showToast(`"${result.book!.title}" added to your library`);
        } else {
            showToast(result.error || "Failed to add book", "error");
        }
    };

    const handleUpdate = async (data: BookFormData) => {
        const result = await updateBook((modal as Book).id, data);
        if (result.success) {
            setModal(null);
            showToast(`"${result.book!.title}" updated successfully`);
        } else {
            showToast(result.error || "Failed to update book", "error");
        }
    };

    const handleDelete = async (id: string) => {
        const book = books.find((b) => b.id === id);
        const result = await deleteBook(id);
        if (result.success) {
            showToast(`"${book?.title}" removed from library`);
        } else {
            showToast(result.error || "Failed to delete book", "error");
        }
    };

    // Render

    return (
        <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
            {/* Top bar */}
            <header
                style={{
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg2)",
                    padding: "0 24px",
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        height: 60,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 10,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 24,
                                color: "var(--gold)",
                                fontWeight: 600,
                                letterSpacing: -0.5,
                            }}
                        >
                            Bibliotheca
                        </span>
                        <span
                            style={{
                                fontSize: 11,
                                color: "var(--muted)",
                                letterSpacing: 1.2,
                                textTransform: "uppercase",
                            }}
                        >
                            Book Manager
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                        }}
                    >
                        <span style={{ fontSize: 13, color: "var(--muted)" }}>
                            {books.length} book{books.length !== 1 ? "s" : ""}
                        </span>
                        <button
                            onClick={() => setModal("add")}
                            style={{
                                background: "var(--gold)",
                                color: "#0f0e0c",
                                padding: "8px 18px",
                                borderRadius: "var(--radius)",
                                fontWeight: 600,
                                fontSize: 13,
                                letterSpacing: 0.3,
                            }}
                        >
                            + Add Book
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Main content ── */}
            <main
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "24px 24px 60px",
                }}
            >
                {/* Filter bar */}
                <FilterBar
                    search={search}
                    setSearch={setSearch}
                    genreFilter={genreFilter}
                    setGenreFilter={setGenreFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    view={view}
                    setView={setView}
                    books={books}
                />

                {/* Active filter summary */}
                {isFiltered && !loading && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 16,
                        }}
                    >
                        <p style={{ fontSize: 13, color: "var(--muted)" }}>
                            <span
                                style={{
                                    color: "var(--cream)",
                                    fontWeight: 500,
                                }}
                            >
                                {filtered.length}
                            </span>{" "}
                            result{filtered.length !== 1 ? "s" : ""}
                            {search && (
                                <span>
                                    {" "}
                                    for{" "}
                                    <em style={{ color: "var(--cream)" }}>
                                        "{search}"
                                    </em>
                                </span>
                            )}
                            {genreFilter !== "All" && (
                                <span>
                                    {" "}
                                    in{" "}
                                    <em style={{ color: "var(--cream)" }}>
                                        {genreFilter}
                                    </em>
                                </span>
                            )}
                        </p>
                        <button
                            onClick={clearFilters}
                            style={{
                                background: "none",
                                color: "var(--gold)",
                                fontSize: 13,
                                textDecoration: "underline",
                                padding: 0,
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Loading state */}
                {loading && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "80px 0",
                            color: "var(--muted)",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 40,
                                marginBottom: 16,
                                opacity: 0.35,
                            }}
                        >
                            📚
                        </div>
                        <p
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 18,
                                color: "var(--cream)",
                                marginBottom: 6,
                            }}
                        >
                            Loading your library…
                        </p>
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                border: "2px solid var(--border)",
                                borderTop: "2px solid var(--gold)",
                                borderRadius: "50%",
                                animation: "spin 0.8s linear infinite",
                                margin: "16px auto 0",
                            }}
                        />
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div style={{ textAlign: "center", padding: "80px 0" }}>
                        <p
                            style={{
                                fontSize: 16,
                                color: "var(--red-text)",
                                marginBottom: 16,
                            }}
                        >
                            {error}
                        </p>
                        <button
                            onClick={fetchBooks}
                            style={{
                                background: "var(--bg3)",
                                color: "var(--cream)",
                                padding: "10px 24px",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius)",
                                fontSize: 14,
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && filtered.length === 0 && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "80px 0",
                            color: "var(--muted)",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 44,
                                marginBottom: 16,
                                opacity: 0.25,
                            }}
                        >
                            {isFiltered ? "🔍" : "📚"}
                        </div>
                        <p
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 20,
                                color: "var(--cream)",
                                marginBottom: 8,
                            }}
                        >
                            {isFiltered
                                ? "No books found"
                                : "Your library is empty"}
                        </p>
                        <p style={{ fontSize: 14, marginBottom: 24 }}>
                            {isFiltered
                                ? "Try adjusting your search or filters"
                                : "Start building your reading list"}
                        </p>
                        {isFiltered ? (
                            <button
                                onClick={clearFilters}
                                style={{
                                    background: "var(--bg3)",
                                    color: "var(--cream)",
                                    padding: "10px 24px",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    fontSize: 14,
                                }}
                            >
                                Clear Filters
                            </button>
                        ) : (
                            <button
                                onClick={() => setModal("add")}
                                style={{
                                    background: "var(--gold)",
                                    color: "#0f0e0c",
                                    padding: "11px 28px",
                                    borderRadius: "var(--radius)",
                                    fontWeight: 600,
                                    fontSize: 14,
                                }}
                            >
                                Add Your First Book
                            </button>
                        )}
                    </div>
                )}

                {/* Grid view */}
                {!loading &&
                    !error &&
                    filtered.length > 0 &&
                    view === "grid" && (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(188px, 1fr))",
                                gap: 16,
                            }}
                        >
                            {filtered.map((book: Book) => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    onEdit={(b) => setModal(b)}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}

                {/* List view */}
                {!loading &&
                    !error &&
                    filtered.length > 0 &&
                    view === "list" && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 6,
                            }}
                        >
                            {/* Column headers */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "2fr 1fr 70px 90px 120px",
                                    gap: 12,
                                    padding: "6px 16px",
                                    fontSize: 10,
                                    color: "var(--muted)",
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    fontWeight: 500,
                                }}
                            >
                                <span>Title / Author</span>
                                <span>Genre</span>
                                <span>Year</span>
                                <span>Rating</span>
                                <span />
                            </div>
                            {filtered.map((book: Book) => (
                                <BookListItem
                                    key={book.id}
                                    book={book}
                                    onEdit={(b) => setModal(b)}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
            </main>

            {/* ── Add modal ── */}
            {modal === "add" && (
                <Modal title="Add New Book" onClose={() => setModal(null)}>
                    <BookForm
                        onSubmit={handleAdd}
                        onCancel={() => setModal(null)}
                        loading={actionLoading}
                    />
                </Modal>
            )}

            {/* ── Edit modal ── */}
            {modal && modal !== "add" && (
                <Modal title="Edit Book" onClose={() => setModal(null)}>
                    <BookForm
                        initial={modal}
                        onSubmit={handleUpdate}
                        onCancel={() => setModal(null)}
                        loading={actionLoading}
                    />
                </Modal>
            )}

            {/* ── Toast ── */}
            {toast && (
                <Toast
                    key={toast.key}
                    message={toast.message}
                    type={toast.type}
                    onDismiss={dismissToast}
                />
            )}
        </div>
    );
}
