import { useState } from "react";
import { StarRating } from "./StarRating";
import { GENRE_COLORS } from "../lib/constants";
import type { BookCardProps } from "../lib/types";


export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
    const [deleting, setDeleting] = useState(false);
    const [confirming, setConfirming] = useState(false);

    const handleDeleteClick = async () => {
        if (!confirming) {
            setConfirming(true);
            // Auto-cancel confirmation after 3s
            setTimeout(() => setConfirming(false), 3000);
            return;
        }
        setDeleting(true);
        await onDelete(book.id);
    };

    const genreColor = GENRE_COLORS[book.genre] || "#5a5a5a";

    return (
        <article
            style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                opacity: deleting ? 0.4 : 1,
                transition: "opacity 0.3s, transform 0.2s",
                animation: "fadeIn 0.3s ease",
            }}
        >
            {/* Cover */}
            <div
                style={{
                    height: 168,
                    background: "var(--bg3)",
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                }}
            >
                {book.cover && (
                    <img
                        src={book.cover}
                        alt={`Cover of ${book.title}`}
                        loading="lazy"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.88,
                        }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                )}
                {/* Gradient overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(15,14,12,0.9) 0%, transparent 55%)",
                    }}
                />
                {/* Genre badge */}
                <span
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: genreColor,
                        color: "#fff",
                        fontSize: 10,
                        padding: "3px 8px",
                        borderRadius: 12,
                        fontWeight: 500,
                        letterSpacing: 0.4,
                    }}
                >
                    {book.genre}
                </span>
                {/* Fallback icon when no cover */}
                {!book.cover && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 40,
                            opacity: 0.2,
                        }}
                    >
                        📖
                    </div>
                )}
            </div>

            {/* Details */}
            <div
                style={{
                    padding: "14px 16px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                }}
            >
                <h3
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "var(--cream)",
                        lineHeight: 1.35,
                        flex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {book.title}
                </h3>
                <p
                    style={{
                        fontSize: 13,
                        color: "var(--muted)",
                        marginBottom: 6,
                    }}
                >
                    {book.author}
                </p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <StarRating value={book.rating || 0} />
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                        {book.year}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div
                style={{
                    display: "flex",
                    borderTop: "1px solid var(--border)",
                }}
            >
                <button
                    onClick={() => onEdit(book)}
                    disabled={deleting}
                    aria-label={`Edit ${book.title}`}
                    style={{
                        flex: 1,
                        padding: "9px 0",
                        background: "transparent",
                        color: "var(--muted)",
                        fontSize: 13,
                        borderRight: "1px solid var(--border)",
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={handleDeleteClick}
                    disabled={deleting}
                    aria-label={
                        confirming
                            ? `Confirm delete ${book.title}`
                            : `Delete ${book.title}`
                    }
                    style={{
                        flex: 1,
                        padding: "9px 0",
                        background: confirming ? "var(--red)" : "transparent",
                        color: confirming ? "var(--red-text)" : "var(--muted)",
                        fontSize: 13,
                        transition: "background 0.2s, color 0.2s",
                    }}
                >
                    {deleting ? "…" : confirming ? "Confirm?" : "Delete"}
                </button>
            </div>
        </article>
    );
}
