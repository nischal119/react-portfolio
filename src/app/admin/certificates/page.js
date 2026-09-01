"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Award, Image as ImageIcon } from "lucide-react";
import CertificateForm from "@/components/admin/CertificateForm";
import DeleteDialog from "@/components/admin/DeleteDialog";
import { useToast } from "@/components/admin/ToastContext";

export default function AdminCertificatesPage() {
  const { addToast } = useToast();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/certificates")
      .then((r) => r.json())
      .then((data) => setCertificates(data.certificates || []))
      .catch(() => addToast("Failed to load certificates", "error"))
      .finally(() => setLoading(false));
  }, [addToast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleCreate(data) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      addToast("Certificate created successfully", "success");
      setFormOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || "Failed to create certificate", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(data) {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/certificates/${editingCert.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      addToast("Certificate updated successfully", "success");
      setEditingCert(null);
      fetchData();
    } catch (err) {
      addToast(err.message || "Failed to update certificate", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/certificates/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      addToast("Certificate deleted", "success");
      setDeleteTarget(null);
      fetchData();
    } catch {
      addToast("Failed to delete certificate", "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <>
      <div className="admin-section-header">
        <h2 className="admin-section-title">
          All Certificates ({certificates.length})
        </h2>
        <button
          className="admin-btn admin-btn--primary"
          onClick={() => setFormOpen(true)}
        >
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {certificates.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">
            <Award size={28} />
          </div>
          <div className="admin-empty__title">No certificates yet</div>
          <div className="admin-empty__text">
            Click &quot;Add Certificate&quot; to create your first certificate.
          </div>
          <button
            className="admin-btn admin-btn--primary"
            onClick={() => setFormOpen(true)}
          >
            <Plus size={16} /> Add Certificate
          </button>
        </div>
      ) : (
        <div className="admin-cards">
          {certificates.map((cert) => (
            <div key={cert.id} className="admin-card">
              {cert.Img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cert.Img}
                  alt={cert.Title}
                  className="admin-card__img"
                />
              ) : (
                <div className="admin-card__img-placeholder">
                  <ImageIcon size={32} />
                </div>
              )}
              <div className="admin-card__body">
                <span className="admin-card__title">{cert.Title}</span>
                <div className="admin-card__actions">
                  <button
                    className="admin-btn admin-btn--ghost"
                    onClick={() => setEditingCert(cert)}
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    className="admin-btn admin-btn--ghost"
                    onClick={() => setDeleteTarget(cert)}
                    title="Delete"
                    style={{ color: "var(--admin-danger)" }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create modal */}
      {formOpen && (
        <CertificateForm
          onSubmit={handleCreate}
          onCancel={() => setFormOpen(false)}
          loading={submitting}
        />
      )}

      {/* Edit modal */}
      {editingCert && (
        <CertificateForm
          certificate={editingCert}
          onSubmit={handleUpdate}
          onCancel={() => setEditingCert(null)}
          loading={submitting}
        />
      )}

      {/* Delete dialog */}
      {deleteTarget && (
        <DeleteDialog
          title={deleteTarget.Title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={submitting}
        />
      )}
    </>
  );
}
