import { useEffect } from "react";

/**
 * Modal — accessible overlay with focus trap & ESC to close.
 */
export function Modal({ title, onClose, children }) {
    // Close on ESC
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.78)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                backdropFilter: "blur(2px)",
                animation: "fadeIn 0.2s ease",
            }}
        >
            <div
                style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    width: "100%",
                    maxWidth: 520,
                    maxHeight: "92vh",
                    overflowY: "auto",
                    animation: "fadeIn 0.2s ease",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "18px 24px",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "sticky",
                        top: 0,
                        background: "var(--bg2)",
                        zIndex: 1,
                    }}
                >
                    <h2
                        id="modal-title"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 20,
                            color: "var(--cream)",
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </h2>
                    <button
                        aria-label="Close dialog"
                        onClick={onClose}
                        style={{
                            background: "var(--bg3)",
                            border: "1px solid var(--border)",
                            color: "var(--muted)",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            fontSize: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: 24 }}>{children}</div>
            </div>
        </div>
    );
}
