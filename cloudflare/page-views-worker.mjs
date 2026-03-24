function json(data, init = {}) {
  const headers = new Headers(init.headers)
  headers.set("Content-Type", "application/json")
  return new Response(JSON.stringify(data), { ...init, headers })
}

function parseAllowedOrigins(value) {
  return String(value || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean)
}

function withCors(request, response, allowedOrigins) {
  const origin = request.headers.get("Origin")
  const headers = new Headers(response.headers)
  const normalizedOrigin = origin ? origin.replace(/\/+$/, "") : null
  const isAllowed =
    normalizedOrigin &&
    (allowedOrigins.includes("*") || allowedOrigins.includes(normalizedOrigin))

  if (isAllowed) {
    headers.set(
      "Access-Control-Allow-Origin",
      allowedOrigins.includes("*") ? "*" : normalizedOrigin
    )
    headers.set("Vary", "Origin")
  }

  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  headers.set("Access-Control-Allow-Headers", "Content-Type")

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function normalizePath(path) {
  if (typeof path !== "string") {
    return null
  }

  let normalized = path.trim()
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`
  }

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, "")
  }

  if (!normalized || normalized.length > 512) {
    return null
  }

  return normalized
}

export default {
  async fetch(request, env) {
    const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGINS || "*")

    if (request.method === "OPTIONS") {
      return withCors(request, new Response(null, { status: 204 }), allowedOrigins)
    }

    const id = env.PAGE_VIEW_COUNTER.idFromName("global")
    const stub = env.PAGE_VIEW_COUNTER.get(id)
    const response = await stub.fetch(request)
    return withCors(request, response, allowedOrigins)
  },
}

export class PageViewCounter {
  constructor(ctx) {
    this.ctx = ctx
    this.ready = this.ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS page_views (
          path TEXT PRIMARY KEY,
          views INTEGER NOT NULL DEFAULT 0,
          updated_at INTEGER NOT NULL
        )
      `)
    })
  }

  async fetch(request) {
    await this.ready

    const url = new URL(request.url)

    if (request.method === "POST" && url.pathname === "/track") {
      const body = await request.json().catch(() => null)
      const path = normalizePath(body?.path)
      if (!path) {
        return json({ error: "Invalid path" }, { status: 400 })
      }

      const views = this.increment(path)
      return json({ ok: true, path, views })
    }

    if (request.method === "GET" && url.pathname === "/views") {
      const path = normalizePath(url.searchParams.get("path"))
      if (!path) {
        return json({ error: "Invalid path" }, { status: 400 })
      }

      return json({ path, views: this.getViews(path) })
    }

    if (request.method === "GET" && url.pathname === "/top-words") {
      const prefix = normalizePath(url.searchParams.get("prefix") || "/slovo")
      const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || "10"), 1), 50)
      return json({ words: this.getTopPaths(prefix, limit) })
    }

    return json({ error: "Not found" }, { status: 404 })
  }

  increment(path) {
    const now = Date.now()
    this.ctx.storage.sql.exec(
      `
        INSERT INTO page_views (path, views, updated_at)
        VALUES (?1, 1, ?2)
        ON CONFLICT(path)
        DO UPDATE SET views = views + 1, updated_at = excluded.updated_at
      `,
      path,
      now
    )

    return this.getViews(path)
  }

  getViews(path) {
    const rows = this.ctx.storage.sql.exec(
      "SELECT views FROM page_views WHERE path = ?1 LIMIT 1",
      path
    )

    for (const row of rows) {
      return Number(row.views) || 0
    }

    return 0
  }

  getTopPaths(prefix, limit) {
    const rows = this.ctx.storage.sql.exec(
      `
        SELECT path, views
        FROM page_views
        WHERE path LIKE ?1
        ORDER BY views DESC, updated_at DESC
        LIMIT ?2
      `,
      `${prefix}%`,
      limit
    )

    return Array.from(rows, (row) => ({
      path: String(row.path),
      views: Number(row.views) || 0,
    }))
  }
}
