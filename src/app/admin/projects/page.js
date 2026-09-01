"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, FolderKanban, ExternalLink } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";
import DeleteDialog from "@/components/admin/DeleteDialog";
import { useToast } from "@/components/admin/ToastContext";

export default function AdminProjectsPage() {
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((data) => setProjects(data.projects || []))
      .catch(() => addToast("Failed to load projects", "error"))
      .finally(() => setLoading(false));
  }, [addToast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleCreate(data) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      addToast("Project created successfully", "success");
      setFormOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || "Failed to create project", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(data) {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      addToast("Project updated successfully", "success");
      setEditingProject(null);
      fetchData();
    } catch (err) {
      addToast(err.message || "Failed to update project", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/projects/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      addToast("Project deleted", "success");
      setDeleteTarget(null);
      fetchData();
    } catch {
      addToast("Failed to delete project", "error");
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
          All Projects ({projects.length})
        </h2>
        <button
          className="admin-btn admin-btn--primary"
          onClick={() => setFormOpen(true)}
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">
            <FolderKanban size={28} />
          </div>
          <div className="admin-empty__title">No projects yet</div>
          <div className="admin-empty__text">
            Click &quot;Add Project&quot; to create your first project.
          </div>
          <button
            className="admin-btn admin-btn--primary"
            onClick={() => setFormOpen(true)}
          >
            <Plus size={16} /> Add Project
          </button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Tech Stack</th>
                <th>Link</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    {project.Img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.Img}
                        alt={project.Title}
                        className="admin-table__thumb"
                      />
                    ) : (
                      <div
                        className="admin-table__thumb"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--admin-text-muted)",
                        }}
                      >
                        —
                      </div>
                    )}
                  </td>
                  <td className="admin-table__title">{project.Title}</td>
                  <td className="admin-table__desc">
                    {project.Description || "—"}
                  </td>
                  <td>
                    <div className="admin-table__tags">
                      {(project.TechStack || []).slice(0, 4).map((t) => (
                        <span key={t} className="admin-tag">
                          {t}
                        </span>
                      ))}
                      {(project.TechStack || []).length > 4 && (
                        <span className="admin-tag">
                          +{project.TechStack.length - 4}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {project.Link ? (
                      <a
                        href={project.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn admin-btn--ghost"
                        style={{ padding: "4px" }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button
                        className="admin-btn admin-btn--ghost"
                        onClick={() => setEditingProject(project)}
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-btn admin-btn--ghost"
                        onClick={() => setDeleteTarget(project)}
                        title="Delete"
                        style={{ color: "var(--admin-danger)" }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create modal */}
      {formOpen && (
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() => setFormOpen(false)}
          loading={submitting}
        />
      )}

      {/* Edit modal */}
      {editingProject && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProject(null)}
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
