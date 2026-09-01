"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { uploadImage } from "@/lib/firebase";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function ImageUpload({ value, onChange, folder = "images", disabled }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [mode, setMode] = useState(value && !value.startsWith("https://firebasestorage") ? "url" : "upload");
  const [urlInput, setUrlInput] = useState(value || "");
  const fileRef = useRef(null);
  const dropRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  function validateFile(file) {
    if (!ACCEPTED.includes(file.type)) {
      setError("Only JPG, PNG, WebP, and GIF are allowed.");
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError("File must be under 5MB.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleFile(file) {
    if (!validateFile(file)) return;
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadImage(file, folder, setProgress);
      onChange(url);
      setUrlInput(url);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function handleRemove() {
    onChange("");
    setUrlInput("");
    setError("");
  }

  function handleUrlChange(e) {
    setUrlInput(e.target.value);
    onChange(e.target.value);
  }

  return (
    <div className="admin-field">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <label className="admin-label" style={{ margin: 0 }}>Image</label>
        <div className="img-upload-mode-toggle">
          <button
            type="button"
            className={`img-upload-mode-btn ${mode === "upload" ? "img-upload-mode-btn--active" : ""}`}
            onClick={() => setMode("upload")}
            disabled={disabled || uploading}
          >
            <Upload size={12} /> Upload
          </button>
          <button
            type="button"
            className={`img-upload-mode-btn ${mode === "url" ? "img-upload-mode-btn--active" : ""}`}
            onClick={() => setMode("url")}
            disabled={disabled || uploading}
          >
            <LinkIcon size={12} /> URL
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <>
          <input
            className="admin-input"
            value={urlInput}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            disabled={disabled}
          />
        </>
      ) : (
        <>
          {/* Preview of uploaded image */}
          {value && !uploading ? (
            <div className="img-upload-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Uploaded"
                className="img-upload-preview__img"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <button
                type="button"
                className="img-upload-preview__remove"
                onClick={handleRemove}
                disabled={disabled}
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            /* Drop zone */
            <div
              ref={dropRef}
              className={`img-upload-dropzone ${dragOver ? "img-upload-dropzone--active" : ""} ${uploading ? "img-upload-dropzone--uploading" : ""}`}
              onClick={() => !uploading && !disabled && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPTED.join(",")}
                onChange={handleFileSelect}
                style={{ display: "none" }}
                disabled={disabled || uploading}
              />
              {uploading ? (
                <div className="img-upload-progress">
                  <div className="img-upload-progress__bar">
                    <div
                      className="img-upload-progress__fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="img-upload-progress__text">{progress}%</span>
                </div>
              ) : (
                <>
                  <div className="img-upload-dropzone__icon">
                    <ImageIcon size={24} />
                  </div>
                  <span className="img-upload-dropzone__text">
                    Drag & drop or <strong>click to browse</strong>
                  </span>
                  <span className="img-upload-dropzone__hint">
                    JPG, PNG, WebP, GIF — max 5MB
                  </span>
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* Common preview for URL mode */}
      {mode === "url" && value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Preview"
          className="admin-img-preview"
          onError={(e) => { e.target.style.display = "none"; }}
          onLoad={(e) => { e.target.style.display = "block"; }}
        />
      )}

      {error && (
        <span style={{ color: "var(--admin-danger)", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>
          {error}
        </span>
      )}
    </div>
  );
}
