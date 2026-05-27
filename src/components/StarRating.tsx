import { useState } from "react";

export function StarRating({ value = 0, onChange } : { value: number, onChange?: (value: number) => void }) {
    const [hovered, setHovered] = useState(0);
    const interactive = typeof onChange === "function";
    const display = hovered || value;

    return (
        <div
            style={{ display: "flex", gap: 2 }}
            onMouseLeave={() => interactive && setHovered(0)}
            aria-label={`Rating: ${value} out of 5`}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    role={interactive ? "button" : undefined}
                    tabIndex={interactive ? 0 : undefined}
                    aria-label={
                        interactive
                            ? `Rate ${star} star${star !== 1 ? "s" : ""}`
                            : undefined
                    }
                    onClick={() => interactive && onChange(star)}
                    onMouseEnter={() => interactive && setHovered(star)}
                    onKeyDown={(e) =>
                        interactive && e.key === "Enter" && onChange(star)
                    }
                    style={{
                        cursor: interactive ? "pointer" : "default",
                        fontSize: 15,
                        color: display >= star ? "var(--gold)" : "var(--bg4)",
                        transition: "color 0.1s",
                        userSelect: "none",
                        lineHeight: 1,
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
}
