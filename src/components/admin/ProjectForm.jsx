"use client";

import { useState, useRef } from "react";
import { X, Image as ImageIcon } from "lucide-react";

export default function ProjectForm({ project, onSubmit, onCancel, loading }) {
  const isEditing = Boolean(project);
  const [title, setTitle] = useState(project?.Title || "");
  const [description, setDescription] = useState(project?.Description || "");
  const [img, setImg] = useState(project?.Img || "");
  const [link, setLink] = useState(project?.Link || "");
  const [techStack, setTechStack] = useState(project?.TechStack || []);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const tagInputRef = useRef(null);

  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleTagKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim().replace(/,/g, "");
      if (tag && !techStack.includes(tag)) {
        setTechStack((prev) => [...prev, tag]);
      }
      setTagInput("");
    } else if (e.key === "Backspace" && tagInput === "" && techStack.length > 0) {
      setTechStack((prev) => prev.slice(0, -1));
    }
  }

  function removeTag(tag) {
    setTechStack((prev) => prev.filter((t) => t !== tag));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      Title: title.trim(),
      Description: description.trim(),
      Img: img.trim(),
      Link: link.trim(),
      TechStack: techStack,
    });
  }

  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <span className="admin-modal__title">
            {isEditing ? "Edit Project" : "Add New Project"}
          </span>
          <button className="admin-btn admin-btn--ghost" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal__body">
            <div className="admin-field">
              <label className="admin-label" htmlFor="proj-title">
                Title *
              </label>
              <input
                id="proj-title"
                className={`admin-input ${errors.title ? "admin-input--error" : ""}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project name"
                disabled={loading}
              />
              {errors.title && (
                <span style={{ color: "var(--admin-danger)", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>
                  {errors.title}
                </span>
              )}
            </div>

            <div className="admin-field">
              <label className="admin-label" htmlFor="proj-desc">
                Description
              </label>
              <textarea
                id="proj-desc"
                className="admin-input admin-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the project"
                disabled={loading}
              />
            </div>

            <div className="admin-field">
              <label className="admin-label" htmlFor="proj-img">
                Image URL
              </label>
              <input
                id="proj-img"
                className="admin-input"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="https://example.com/image.jpg"
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

            <div className="admin-field">
              <label className="admin-label" htmlFor="proj-link">
                Live Link
              </label>
              <input
                id="proj-link"
                className="admin-input"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://project-url.com"
                disabled={loading}
              />
            </div>

            <div className="admin-field">
              <label className="admin-label">Tech Stack</label>
              <div
                className="tag-input-wrap"
                onClick={() => tagInputRef.current?.focus()}
              >
                {techStack.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                    <button
                      type="button"
                      className="tag-chip__remove"
                      onClick={() => removeTag(tag)}
                      disabled={loading}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  ref={tagInputRef}
                  className="tag-input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={techStack.length === 0 ? "Type and press Enter…" : ""}
                  disabled={loading}
                />
              </div>
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
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
