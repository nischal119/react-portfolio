"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/firebase";

export function usePortfolioData() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    fetchPortfolioData()
      .then(({ projects, certificates }) => {
        if (cancelled) return;
        setProjects(projects);
        setCertificates(certificates);
        setStatus("ready");
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, certificates, status };
}
