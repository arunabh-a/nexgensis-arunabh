import { StarRating } from "./StarRating";
import type { BookListItemProps } from "../lib/types";

export function BookListItem({ book, onEdit, onDelete }: BookListItemProps) {
    return (
        <div
            style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "13px 16px",
                display: "grid",
                gridTemplateColumns: "2fr 1fr 70px 90px 120px",
                gap: 12,
                alignItems: "center",
                animation: "fadeIn 0.25s ease",
            }}
        >
            {/* Title + Author */}
            <div>
                <p
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "var(--cream)",
                        marginBottom: 2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {book.title}
                </p>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>
                    {book.author}
                </p>
            </div>

            {/* Genre */}
            <span
                style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {book.genre}
            </span>

            {/* Year */}
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
                {book.year}
            </span>

            {/* Rating */}
            <StarRating value={book.rating || 0} />

            {/* Actions */}
            <div
                style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
                <button
                    onClick={() => onEdit(book)}
                    aria-label={`Edit ${book.title}`}
                    style={{
                        padding: "6px 12px",
                        background: "var(--bg3)",
                        color: "var(--muted)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        fontSize: 12,
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(book.id)}
                    aria-label={`Delete ${book.title}`}
                    style={{
                        padding: "6px 12px",
                        background: "transparent",
                        color: "var(--red-text)",
                        border: "1px solid var(--red)",
                        borderRadius: "var(--radius)",
                        fontSize: 12,
                    }}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
