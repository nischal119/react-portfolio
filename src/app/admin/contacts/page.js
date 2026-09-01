"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, MessageSquare, Mail, Phone, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import DeleteDialog from "@/components/admin/DeleteDialog";
import { useToast } from "@/components/admin/ToastContext";

export default function AdminContactsPage() {
  const { addToast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then((data) => setContacts(data.contacts || []))
      .catch(() => addToast("Failed to load contacts", "error"))
      .finally(() => setLoading(false));
  }, [addToast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function toggleRead(contact) {
    try {
      const res = await fetch(`/api/admin/contacts/${contact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !contact.read }),
      });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      addToast("Failed to update", "error");
    }
  }

  async function handleDelete() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/contacts/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      addToast("Message deleted", "success");
      setDeleteTarget(null);
      fetchData();
    } catch {
      addToast("Failed to delete", "error");
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <>
      <div className="admin-section-header">
        <h2 className="admin-section-title">
          All Messages ({contacts.length})
          {unreadCount > 0 && (
            <span className="admin-badge" style={{ marginLeft: "0.5rem", verticalAlign: "middle" }}>
              {unreadCount} new
            </span>
          )}
        </h2>
      </div>

      {contacts.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">
            <MessageSquare size={28} />
          </div>
          <div className="admin-empty__title">No messages yet</div>
          <div className="admin-empty__text">
            Contact form submissions will appear here.
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <>
                  <tr
                    key={contact.id}
                    style={{
                      cursor: "pointer",
                      background: !contact.read ? "var(--admin-accent-soft)" : undefined,
                    }}
                    onClick={() => setExpanded(expanded === contact.id ? null : contact.id)}
                  >
                    <td>
                      {!contact.read && (
                        <span className="admin-unread-dot" />
                      )}
                    </td>
                    <td className="admin-table__title" style={{ fontWeight: contact.read ? 500 : 700 }}>
                      {contact.name}
                    </td>
                    <td>
                      <a href={`mailto:${contact.email}`} onClick={(e) => e.stopPropagation()} style={{ color: "var(--admin-accent)", textDecoration: "none", fontSize: "0.85rem" }}>
                        {contact.email}
                      </a>
                    </td>
                    <td style={{ fontSize: "0.85rem", color: "var(--admin-text-soft)" }}>{contact.phone}</td>
                    <td className="admin-table__desc">{contact.message}</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--admin-text-muted)", whiteSpace: "nowrap" }}>
                      {formatDate(contact.submittedAt)}
                    </td>
                    <td>
                      <div className="admin-table__actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="admin-btn admin-btn--ghost"
                          onClick={() => toggleRead(contact)}
                          title={contact.read ? "Mark as unread" : "Mark as read"}
                        >
                          {contact.read ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button
                          className="admin-btn admin-btn--ghost"
                          onClick={() => setDeleteTarget(contact)}
                          title="Delete"
                          style={{ color: "var(--admin-danger)" }}
                        >
                          <Trash2 size={15} />
                        </button>
                        {expanded === contact.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </td>
                  </tr>
                  {expanded === contact.id && (
                    <tr key={`${contact.id}-expanded`}>
                      <td colSpan={7} style={{ padding: "1.25rem 1.5rem", background: "var(--admin-bg-2)", borderBottom: "1px solid var(--admin-border)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.5rem 1.5rem", fontSize: "0.875rem", maxWidth: 600 }}>
                          <span style={{ color: "var(--admin-text-muted)", fontWeight: 600 }}>Name:</span>
                          <span>{contact.name}</span>
                          <span style={{ color: "var(--admin-text-muted)", fontWeight: 600 }}>Email:</span>
                          <a href={`mailto:${contact.email}`} style={{ color: "var(--admin-accent)" }}>{contact.email}</a>
                          <span style={{ color: "var(--admin-text-muted)", fontWeight: 600 }}>Phone:</span>
                          <span>{contact.phone}</span>
                          <span style={{ color: "var(--admin-text-muted)", fontWeight: 600 }}>Message:</span>
                          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, margin: 0 }}>{contact.message}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <DeleteDialog
          title={`message from ${deleteTarget.name}`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={submitting}
        />
      )}
    </>
  );
}
