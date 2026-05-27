import { useState } from "react";
import { GENRES } from "../lib/constants";
import { StarRating } from "./StarRating";
import type { BookFormData, BookFormProps } from "../lib/types";

const CURRENT_YEAR = new Date().getFullYear();

const EMPTY_FORM: BookFormData = {
    title: "",
    author: "",
    genre: "Fiction",
    year: CURRENT_YEAR,
    cover: "",
    rating: 0,
};

function validate(form: BookFormData): Partial<Record<keyof BookFormData, string>> {
    const errors: Partial<Record<keyof BookFormData, string>> = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.author.trim()) errors.author = "Author is required";
    const y = parseInt(form.year as unknown as string, 10);
    if (!y || y < 1 || y > CURRENT_YEAR + 5) errors.year = "Enter a valid year";
    return errors;
}

/**
 * BookForm — used for both creating and editing books.
 * @param {object}   initial  - pre-filled data for edit mode
 * @param {function} onSubmit - called with validated form data
 * @param {function} onCancel
 * @param {boolean}  loading  - disables submit while API call is in progress
 */
export function BookForm({
    initial = null,
    onSubmit,
    onCancel,
    loading = false,
}: BookFormProps) {
    const [form, setForm] = useState<BookFormData>(
        initial
            ? {
                  title: initial.title || "",
                  author: initial.author || "",
                  genre: initial.genre || "Fiction",
                  year: initial.year || CURRENT_YEAR,
                  cover: initial.cover || "",
                  rating: initial.rating || 0,
              }
            : { ...EMPTY_FORM },
    );

    const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof BookFormData, boolean>>>({});

    const set = (key: keyof BookFormData, value: BookFormData[keyof BookFormData]) => {
        setForm((f) => ({ ...f, [key]: value }));
        if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };

    const touch = (key: keyof BookFormData) => setTouched((t) => ({ ...t, [key]: true }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            setTouched({ title: true, author: true, year: true });
            return;
        }
        onSubmit(form);
    };

    const fieldStyle = (key: keyof BookFormData): React.CSSProperties => ({
        borderColor:
            errors[key] && touched[key] ? "var(--red-text)" : undefined,
    });

    const labelStyle = {
        display: "block",
        fontSize: 11,
        color: "var(--muted)",
        marginBottom: 6,
        letterSpacing: 0.8,
        textTransform: "uppercase",
        fontWeight: 500,
    };

    const errorStyle = {
        fontSize: 12,
        color: "var(--red-text)",
        marginTop: 5,
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* Title */}
            <div style={{ marginBottom: 16 }}>
                <label htmlFor="f-title" style={labelStyle}>
                    Title *
                </label>
                <input
                    id="f-title"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    onBlur={() => touch("title")}
                    placeholder="e.g. The Great Gatsby"
                    style={fieldStyle("title")}
                />
                {errors.title && touched.title && (
                    <p style={errorStyle}>{errors.title}</p>
                )}
            </div>

            {/* Author */}
            <div style={{ marginBottom: 16 }}>
                <label htmlFor="f-author" style={labelStyle}>
                    Author *
                </label>
                <input
                    id="f-author"
                    value={form.author}
                    onChange={(e) => set("author", e.target.value)}
                    onBlur={() => touch("author")}
                    placeholder="e.g. F. Scott Fitzgerald"
                    style={fieldStyle("author")}
                />
                {errors.author && touched.author && (
                    <p style={errorStyle}>{errors.author}</p>
                )}
            </div>

            {/* Genre + Year */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 16,
                }}
            >
                <div>
                    <label htmlFor="f-genre" style={labelStyle}>
                        Genre
                    </label>
                    <select
                        id="f-genre"
                        value={form.genre}
                        onChange={(e) => set("genre", e.target.value)}
                    >
                        {GENRES.map((g) => (
                            <option key={g}>{g}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="f-year" style={labelStyle}>
                        Publication Year *
                    </label>
                    <input
                        id="f-year"
                        type="number"
                        value={form.year}
                        onChange={(e) => set("year", e.target.value)}
                        onBlur={() => touch("year")}
                        min="1"
                        max={CURRENT_YEAR + 5}
                        placeholder="2024"
                        style={fieldStyle("year")}
                    />
                    {errors.year && touched.year && (
                        <p style={errorStyle}>{errors.year}</p>
                    )}
                </div>
            </div>

            {/* Cover URL */}
            <div style={{ marginBottom: 16 }}>
                <label htmlFor="f-cover" style={labelStyle}>
                    Cover Image URL{" "}
                    <span style={{ color: "var(--bg4)" }}>(optional)</span>
                </label>
                <input
                    id="f-cover"
                    type="url"
                    value={form.cover}
                    onChange={(e) => set("cover", e.target.value)}
                    placeholder="https://..."
                />
                {form.cover && (
                    <div
                        style={{
                            marginTop: 10,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <img
                            src={form.cover}
                            alt="Cover preview"
                            onError={(
                                e: React.SyntheticEvent<HTMLImageElement>,
                            ) => {
                                e.currentTarget.style.display = "none";
                            }}
                            style={{
                                width: 40,
                                height: 56,
                                objectFit: "cover",
                                borderRadius: 3,
                                border: "1px solid var(--border)",
                            }}
                        />
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>
                            Preview
                        </span>
                    </div>
                )}
            </div>

            {/* Rating */}
            <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Your Rating</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <StarRating
                        value={form.rating}
                        onChange={(v) => set("rating", v)}
                    />
                    {form.rating > 0 && (
                        <button
                            type="button"
                            onClick={() => set("rating", 0)}
                            style={{
                                background: "none",
                                color: "var(--muted)",
                                fontSize: 12,
                                textDecoration: "underline",
                                padding: 0,
                            }}
                        >
                            clear
                        </button>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        flex: 1,
                        padding: "12px 0",
                        background: loading ? "var(--bg4)" : "var(--gold)",
                        color: loading ? "var(--muted)" : "#0f0e0c",
                        fontWeight: 600,
                        fontSize: 14,
                        borderRadius: "var(--radius)",
                        letterSpacing: 0.3,
                    }}
                >
                    {loading
                        ? initial
                            ? "Saving…"
                            : "Adding…"
                        : initial
                          ? "Save Changes"
                          : "Add to Library"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    style={{
                        padding: "12px 20px",
                        background: "var(--bg3)",
                        color: "var(--muted)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        fontSize: 14,
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
