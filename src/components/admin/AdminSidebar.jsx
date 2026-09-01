"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Award, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  function isActive(item) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  return (
    <aside className={`admin-sidebar ${isOpen ? "admin-sidebar--open" : ""}`}>
      <div className="admin-sidebar__brand">
        <div className="admin-sidebar__brand-icon">N</div>
        <span className="admin-sidebar__brand-text">Portfolio Admin</span>
        {/* Mobile close */}
        <button
          className="admin-btn admin-btn--ghost"
          onClick={onClose}
          aria-label="Close sidebar"
          style={{ marginLeft: "auto", display: isOpen ? "flex" : "none" }}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="admin-sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-sidebar__link ${
              isActive(item) ? "admin-sidebar__link--active" : ""
            }`}
            onClick={onClose}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <Link
          href="/"
          className="admin-sidebar__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Portfolio
        </Link>
      </div>
    </aside>
  );
}
