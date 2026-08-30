"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/firebase";

function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const aFeatured = /gloosy/i.test(a.Title || "");
    const bFeatured = /gloosy/i.test(b.Title || "");
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return 0;
  });
}

export function usePortfolioData() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    fetchPortfolioData()
      .then(({ projects, certificates }) => {
        if (cancelled) return;
        setProjects(sortProjects(projects));
        setCertificates(certificates);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, certificates, status };
}
