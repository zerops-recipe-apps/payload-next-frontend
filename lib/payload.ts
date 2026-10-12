export type SiteInfo = {
  title: string
  description: string
}

export type BlogPost = {
  title: string
  slug: string
  excerpt: string
  body: string
  publishedAt?: string
  coverUrl?: string | null
}

export function getApiBase() {
  return (process.env.NEXT_PUBLIC_PAYLOAD_URL ?? process.env.PAYLOAD_URL ?? '').replace(/\/$/, '')
}

export function payloadAdminUrl(): string {
  const apiBase = getApiBase()
  return apiBase ? `${apiBase}/admin` : '/admin'
}

export function formatDate(iso?: string) {
  if (!iso) {
    return null
  }
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export async function fetchJson(path: string) {
  const apiBase = getApiBase()
  const url = `${apiBase}${path}`
  const res = await fetch(url, { cache: 'no-store' })
  const contentType = res.headers.get('content-type') ?? ''
  if (!res.ok) {
    const body = contentType.includes('application/json')
      ? JSON.stringify(await res.json())
      : await res.text()
    throw new Error(`${path} returned ${res.status}${body ? `: ${body.slice(0, 120)}` : ''}`)
  }
  if (!contentType.includes('application/json')) {
    throw new Error(
      `Expected JSON from ${path}. Check NEXT_PUBLIC_PAYLOAD_URL (currently ${apiBase || 'unset'}).`,
    )
  }
  return res.json()
}

export function mapBlogPost(doc: Record<string, unknown>): BlogPost | null {
  const title = String(doc.title ?? '')
  const slug = String(doc.slug ?? '')
  const excerpt = String(doc.excerpt ?? '')
  const body = String(doc.body ?? '')
  if (!title || !slug || !excerpt) {
    return null
  }
  return {
    title,
    slug,
    excerpt,
    body,
    publishedAt: doc.publishedAt ? String(doc.publishedAt) : undefined,
    coverUrl: doc.coverUrl ? String(doc.coverUrl) : null,
  }
}

export async function fetchSiteInfo(): Promise<SiteInfo> {
  const json = await fetchJson('/api/globals/site-info')
  const title = String(json?.title ?? '')
  const description = String(json?.description ?? '')
  if (!title) {
    throw new Error('Missing site-info global in Payload')
  }
  return { title, description }
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const json = await fetchJson('/api/blog-posts?sort=-publishedAt&limit=100')
  const docs = (json?.docs ?? []) as Record<string, unknown>[]
  return docs.map(mapBlogPost).filter((post): post is BlogPost => post !== null)
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const encoded = encodeURIComponent(slug)
  const json = await fetchJson(
    `/api/blog-posts?where[slug][equals]=${encoded}&limit=1`,
  )
  const docs = (json?.docs ?? []) as Record<string, unknown>[]
  return docs.length ? mapBlogPost(docs[0]) : null
}
