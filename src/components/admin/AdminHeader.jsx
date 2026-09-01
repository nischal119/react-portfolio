"use client";

import { usePathname } from "next/navigation";
import { Menu, LogOut } from "lucide-react";

const PAGE_TITLES = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/certificates": "Certificates",
};

export default function AdminHeader({ onToggleSidebar, onLogout }) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Admin";

  return (
    <header className="admin-header">
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          className="admin-mobile-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
        <h1 className="admin-header__title">{title}</h1>
      </div>

      <div className="admin-header__actions">
        <div className="admin-header__user">
          <div className="admin-header__avatar">N</div>
          <span>nischal119</span>
        </div>
        <button
          className="admin-btn admin-btn--ghost"
          onClick={onLogout}
          title="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
