"use client";

import { AlertTriangle, X } from "lucide-react";

export default function DeleteDialog({ title, onConfirm, onCancel, loading }) {
  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
        <div className="admin-modal__header">
          <span className="admin-modal__title">Confirm Delete</span>
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        <div className="admin-modal__body">
          <div className="delete-dialog__icon">
            <AlertTriangle size={24} />
          </div>
          <p className="delete-dialog__text">
            Are you sure you want to delete <strong>{title}</strong>?
            <br />
            This action cannot be undone.
          </p>
        </div>
        <div className="admin-modal__footer">
          <button
            className="admin-btn admin-btn--secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="admin-btn admin-btn--danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="admin-spinner" /> Deleting…
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
