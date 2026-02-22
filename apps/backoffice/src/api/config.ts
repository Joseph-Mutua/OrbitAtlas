const rawBase = import.meta.env.VITE_API_BASE ?? "/api";
export const API_BASE =
  rawBase.startsWith("http") && !rawBase.endsWith("/api")
    ? `${rawBase.replace(/\/$/, "")}/api`
    : rawBase;
