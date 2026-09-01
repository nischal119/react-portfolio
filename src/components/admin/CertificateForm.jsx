"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function CertificateForm({ certificate, onSubmit, onCancel, loading }) {
  const isEditing = Boolean(certificate);
  const [title, setTitle] = useState(certificate?.Title || "");
  const [img, setImg] = useState(certificate?.Img || "");
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      Title: title.trim(),
      Img: img.trim(),
    });
  }

  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <div className="admin-modal__header">
          <span className="admin-modal__title">
            {isEditing ? "Edit Certificate" : "Add New Certificate"}
          </span>
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal__body">
            <div className="admin-field">
              <label className="admin-label" htmlFor="cert-title">
                Title *
              </label>
              <input
                id="cert-title"
                className={`admin-input ${errors.title ? "admin-input--error" : ""}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Certificate name"
                disabled={loading}
              />
              {errors.title && (
                <span style={{ color: "var(--admin-danger)", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>
                  {errors.title}
                </span>
              )}
            </div>

            <div className="admin-field">
              <label className="admin-label" htmlFor="cert-img">
                Image URL
              </label>
              <input
                id="cert-img"
                className="admin-input"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="https://example.com/certificate.jpg"
                disabled={loading}
              />
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img}
                  alt="Preview"
                  className="admin-img-preview"
                  onError={(e) => { e.target.style.display = "none"; }}
                  onLoad={(e) => { e.target.style.display = "block"; }}
                />
              )}
            </div>
          </div>

          <div className="admin-modal__footer">
            <button
              type="button"
              className="admin-btn admin-btn--secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn--primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="admin-spinner" />
                  {isEditing ? "Saving…" : "Creating…"}
                </>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Certificate"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
