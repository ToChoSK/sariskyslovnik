const DEFAULT_TIMEOUT_MS = 4000
const WORD_PATH_PREFIX = "/slovo/"

type CounterResponse = {
  views?: number
}

type TopWordResponse = {
  words?: Array<{
    path: string
    views: number
  }>
}

function getCounterBaseUrl(): string {
  return (
    process.env.CLOUDFLARE_COUNTER_URL ??
    process.env.NEXT_PUBLIC_CLOUDFLARE_COUNTER_URL ??
    ""
  ).replace(/\/+$/, "")
}

function normalizePath(path: string): string {
  if (!path) {
    return "/"
  }

  let normalized = path.trim()

  try {
    if (/^https?:\/\//i.test(normalized)) {
      const url = new URL(normalized)
      normalized = `${url.pathname}${url.search}`
    }
  } catch {
    return "/"
  }

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`
  }

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, "")
  }

  return normalized || "/"
}

async function counterRequest<T>(path: string, init?: RequestInit): Promise<T | null> {
  const baseUrl = getCounterBaseUrl()
  if (!baseUrl) {
    return null
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as T
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

export function isCounterConfigured(): boolean {
  return getCounterBaseUrl().length > 0
}

export function getPublicCounterBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CLOUDFLARE_COUNTER_URL ??
    process.env.CLOUDFLARE_COUNTER_URL ??
    ""
  ).replace(/\/+$/, "")
}

export function toTrackedPath(path: string): string {
  return normalizePath(path)
}

export async function trackPageView(path: string): Promise<number | null> {
  const normalizedPath = normalizePath(path)
  const payload = await counterRequest<CounterResponse>("/track", {
    method: "POST",
    body: JSON.stringify({ path: normalizedPath }),
  })

  return typeof payload?.views === "number" ? payload.views : null
}

export async function getPageViewCount(path: string): Promise<number | null> {
  const normalizedPath = normalizePath(path)
  const payload = await counterRequest<CounterResponse>(
    `/views?path=${encodeURIComponent(normalizedPath)}`
  )

  return typeof payload?.views === "number" ? payload.views : null
}

export async function getTopWordPaths(limit = 10): Promise<Array<{ url: string; views: number }>> {
  const payload = await counterRequest<TopWordResponse>(
    `/top-words?prefix=${encodeURIComponent(WORD_PATH_PREFIX)}&limit=${limit}`
  )

  if (!payload?.words?.length) {
    return []
  }

  return payload.words
    .filter((word) => word.path.startsWith(WORD_PATH_PREFIX))
    .map((word) => ({
      url: word.path.slice(WORD_PATH_PREFIX.length),
      views: word.views,
    }))
}
