"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Award,
  Plus,
  ArrowRight,
  Eye,
  Calendar,
  Clock,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [analytics, setAnalytics] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/certificates").then((r) => r.json()),
      fetch("/api/admin/contacts").then((r) => r.json()),
      fetch("/api/admin/analytics").then((r) => r.json()),
    ])
      .then(([projData, certData, contactData, analyticsData]) => {
        setProjects(projData.projects || []);
        setCertificates(certData.certificates || []);
        setContacts(contactData.contacts || []);
        if (analyticsData && typeof analyticsData.total === "number") {
          setAnalytics(analyticsData);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  const unreadMessages = contacts.filter((c) => !c.read).length;

  return (
    <>
      {/* Analytics Stats */}
      <h2 className="admin-section-title" style={{ marginBottom: "1rem" }}>
        Visitor Analytics
      </h2>
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--accent">
            <Eye size={22} />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__label">Total Page Views</div>
            <div className="stat-card__value">{analytics.total}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--success">
            <Clock size={22} />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__label">Views Today</div>
            <div className="stat-card__value">{analytics.today}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--warning">
            <TrendingUp size={22} />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__label">Views This Week</div>
            <div className="stat-card__value">{analytics.thisWeek}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--accent">
            <Calendar size={22} />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__label">Views This Month</div>
            <div className="stat-card__value">{analytics.thisMonth}</div>
          </div>
        </div>
      </div>

      {/* Content Stats */}
      <h2 className="admin-section-title" style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        Content & Inquiries
      </h2>
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--accent">
            <FolderKanban size={22} />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__label">Projects</div>
            <div className="stat-card__value">{projects.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--success">
            <Award size={22} />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__label">Certificates</div>
            <div className="stat-card__value">{certificates.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--warning">
            <MessageSquare size={22} />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__label">Messages</div>
            <div className="stat-card__value">
              {contacts.length}
              {unreadMessages > 0 && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--admin-accent)",
                    marginLeft: "0.5rem",
                  }}
                >
                  ({unreadMessages} new)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="admin-section-title" style={{ marginBottom: "1rem" }}>
        Quick Actions
      </h2>
      <div className="admin-quick-actions">
        <Link href="/admin/projects" className="quick-action-card">
          <div className="quick-action-card__icon">
            <Plus size={18} />
          </div>
          <span className="quick-action-card__text">Add New Project</span>
        </Link>

        <Link href="/admin/certificates" className="quick-action-card">
          <div className="quick-action-card__icon">
            <Plus size={18} />
          </div>
          <span className="quick-action-card__text">Add New Certificate</span>
        </Link>

        <Link href="/admin/contacts" className="quick-action-card">
          <div className="quick-action-card__icon">
            <MessageSquare size={18} />
          </div>
          <span className="quick-action-card__text">View Inquiries ({unreadMessages} unread)</span>
        </Link>
      </div>

      {/* Recent Projects */}
      <div className="admin-section-header" style={{ marginTop: "1.5rem" }}>
        <h2 className="admin-section-title">Recent Projects</h2>
        <Link
          href="/admin/projects"
          className="admin-btn admin-btn--secondary"
          style={{ fontSize: "0.8rem" }}
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__icon">
            <FolderKanban size={28} />
          </div>
          <div className="admin-empty__title">No projects yet</div>
          <div className="admin-empty__text">
            Add your first project to get started.
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Tech Stack</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.Img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.Img}
                        alt={p.Title}
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
                  <td className="admin-table__title">{p.Title}</td>
                  <td>
                    <div className="admin-table__tags">
                      {(p.TechStack || []).slice(0, 3).map((t) => (
                        <span key={t} className="admin-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
