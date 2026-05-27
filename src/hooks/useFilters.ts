import { useState, useMemo } from "react";

export function useFilters(books) {
    const [search, setSearch] = useState("");
    const [genreFilter, setGenreFilter] = useState("All");
    const [sortBy, setSortBy] = useState("title");

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();

        return books
            .filter((b) => {
                if (!q) return true;
                return (
                    b.title.toLowerCase().includes(q) ||
                    b.author.toLowerCase().includes(q)
                );
            })
            .filter((b) => genreFilter === "All" || b.genre === genreFilter)
            .sort((a, b) => {
                switch (sortBy) {
                    case "title":
                        return a.title.localeCompare(b.title);
                    case "author":
                        return a.author.localeCompare(b.author);
                    case "year_desc":
                        return b.year - a.year;
                    case "year_asc":
                        return a.year - b.year;
                    case "rating":
                        return (b.rating || 0) - (a.rating || 0);
                    default:
                        return 0;
                }
            });
    }, [books, search, genreFilter, sortBy]);

    const clearFilters = () => {
        setSearch("");
        setGenreFilter("All");
    };

    const isFiltered = search.trim() !== "" || genreFilter !== "All";

    return {
        search,
        setSearch,
        genreFilter,
        setGenreFilter,
        sortBy,
        setSortBy,
        filtered,
        clearFilters,
        isFiltered,
    };
}
