import { useEffect, useState } from "react";

export function Toast({
    message,
    type = "success",
    duration = 2800,
    onDismiss,
}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setVisible(false);
            setTimeout(onDismiss, 300);
        }, duration);
        return () => clearTimeout(t);
    }, [duration, onDismiss]);

    const bg = type === "error" ? "var(--red)" : "var(--green)";
    const textColor =
        type === "error" ? "var(--red-text)" : "var(--green-text)";

    return (
        <div
            role="status"
            aria-live="polite"
            style={{
                position: "fixed",
                bottom: 28,
                left: "50%",
                transform: "translateX(-50%)",
                background: bg,
                color: textColor,
                padding: "12px 24px",
                borderRadius: "var(--radius)",
                fontSize: 14,
                fontWeight: 500,
                zIndex: 300,
                whiteSpace: "nowrap",
                animation: visible ? "slideUp 0.3s ease" : "none",
                opacity: visible ? 1 : 0,
                transition: "opacity 0.3s",
                border: `1px solid ${type === "error" ? "var(--red-text)" : "var(--green-text)"}`,
                letterSpacing: 0.2,
            }}
        >
            {type === "success" ? "✓ " : "✕ "}
            {message}
        </div>
    );
}

export function useToast() {
    const [toast, setToast] = useState(null);

    const show = (message, type = "success") => {
        setToast({ message, type, key: Date.now() });
    };

    const dismiss = () => setToast(null);

    return { toast, showToast: show, dismissToast: dismiss };
}
