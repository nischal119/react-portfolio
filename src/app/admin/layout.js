"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import ToastContainer from "@/components/admin/ToastContainer";
import { AdminToastProvider } from "@/components/admin/ToastContext";
import "./admin.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(null); // null = loading
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip auth check on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthenticated(true); // login page doesn't need auth
      return;
    }

    let cancelled = false;

    fetch("/api/admin/session")
      .then((res) => {
        if (!cancelled) {
          if (res.ok) {
            setAuthenticated(true);
          } else {
            router.push("/admin/login");
          }
        }
      })
      .catch(() => {
        if (!cancelled) router.push("/admin/login");
      });

    return () => { cancelled = true; };
  }, [isLoginPage, router]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // Login page renders without the shell
  if (isLoginPage) {
    return children;
  }

  // Loading state
  if (authenticated === null) {
    return (
      <div className="admin-layout">
        <div className="admin-loading" style={{ minHeight: "100vh" }}>
          <div className="admin-spinner" />
        </div>
      </div>
    );
  }

  return (
    <AdminToastProvider>
      <div className="admin-layout">
        <div className="admin-shell">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="admin-overlay admin-overlay--visible"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="admin-main">
            <AdminHeader
              onToggleSidebar={() => setSidebarOpen((s) => !s)}
              onLogout={handleLogout}
            />
            <div className="admin-content">{children}</div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </AdminToastProvider>
  );
}
