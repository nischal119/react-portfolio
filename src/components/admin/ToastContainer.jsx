"use client";

import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useToast } from "./ToastContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="admin-toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`admin-toast admin-toast--${toast.type}`}
        >
          <span className="admin-toast__icon">
            {toast.type === "success" ? (
              <CheckCircle size={18} color="var(--admin-success)" />
            ) : (
              <AlertCircle size={18} color="var(--admin-danger)" />
            )}
          </span>
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            className="admin-btn admin-btn--ghost"
            onClick={() => removeToast(toast.id)}
            style={{ padding: "2px" }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
