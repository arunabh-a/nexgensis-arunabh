import { GENRES, SORT_OPTIONS } from "../lib/constants";

export function FilterBar({
    search,
    setSearch,
    genreFilter,
    setGenreFilter,
    sortBy,
    setSortBy,
    view,
    setView,
    books,
}) {
    const genreCounts = GENRES.reduce((acc, g) => {
        acc[g] = books.filter((b) => b.genre === g).length;
        return acc;
    }, {});

    return (
        <div
            style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "14px 18px",
                marginBottom: 20,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
            }}
        >
            {/* Search */}
            <div style={{ flex: "1 1 220px", position: "relative" }}>
                <span
                    style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--muted)",
                        fontSize: 16,
                        pointerEvents: "none",
                    }}
                >
                    ⌕
                </span>
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title or author…"
                    aria-label="Search books"
                    style={{ paddingLeft: 36 }}
                />
                {search && (
                    <button
                        aria-label="Clear search"
                        onClick={() => setSearch("")}
                        style={{
                            position: "absolute",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            color: "var(--muted)",
                            fontSize: 18,
                            padding: 0,
                            lineHeight: 1,
                        }}
                    ></button>
                )}
            </div>

            {/* Genre filter */}
            <div style={{ flex: "0 1 170px" }}>
                <select
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                    aria-label="Filter by genre"
                >
                    <option value="All">All Genres</option>
                    {GENRES.map((g) => (
                        <option key={g} value={g}>
                            {g}
                            {genreCounts[g] > 0 ? ` (${genreCounts[g]})` : ""}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort */}
            <div style={{ flex: "0 1 160px" }}>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort books"
                >
                    {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* View toggle */}
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                {["grid", "list"].map((v) => (
                    <button
                        key={v}
                        onClick={() => setView(v)}
                        aria-label={`${v} view`}
                        aria-pressed={view === v}
                        style={{
                            padding: "9px 13px",
                            borderRadius: "var(--radius)",
                            fontSize: 15,
                            background:
                                view === v ? "var(--bg4)" : "transparent",
                            border: `1px solid ${view === v ? "var(--muted)" : "var(--border)"}`,
                            color: view === v ? "var(--cream)" : "var(--muted)",
                        }}
                    >
                        {v === "grid" ? "⊞" : "☰"}
                    </button>
                ))}
            </div>
        </div>
    );
}
