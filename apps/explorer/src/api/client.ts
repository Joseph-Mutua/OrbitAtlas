/**
 * REST API client with abort support and typed responses.
 * Handles loading, error, and stale-response scenarios.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";


export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchJson<T>(
  url: string,
  options: RequestInit & { signal?: AbortSignal } = {}
): Promise<T> {
  const { signal, ...init } = options;
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    signal,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = body as { code?: string; message?: string; details?: Record<string, unknown> };
    throw new ApiError(
      err.message ?? `Request failed: ${res.status}`,
      res.status,
      err.code,
      err.details
    );
  }

  return body as T;
}

export interface FetchOptions {
  signal?: AbortSignal;
}

export const api = {
  async getCommunities(options?: FetchOptions): Promise<{ communities: Array<{ id: string; name: string; thumbnailUrl?: string; phaseCount: number; lotCount: number }> }> {
    return fetchJson(`${API_BASE}/communities`, { signal: options?.signal });
  },

  async getManifest(communityId: string, options?: FetchOptions) {
    return fetchJson<{ manifest: import('@community-explorer/shared').CommunityManifest }>(
      `${API_BASE}/communities/${encodeURIComponent(communityId)}/manifest`,
      { signal: options?.signal }
    );
  },
};
