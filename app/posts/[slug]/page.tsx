import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '../../../components/SiteHeader'
import {
  fetchBlogPostBySlug,
  formatDate,
  payloadAdminUrl,
} from '../../../lib/payload'
import { estimateReadTime, getPostMeta } from '../../../lib/postMeta'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await fetchBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const meta = getPostMeta(post)
  const date = formatDate(post.publishedAt)
  const readTime = estimateReadTime(post.body)
  const author = meta.author ?? 'Zerops'
  const initial = author.charAt(0).toUpperCase()

  return (
    <div className="articles-page">
      <SiteHeader />

      <div className="shell shell--article">
        <nav className="breadcrumb">
          <Link href="/">← Articles</Link>
        </nav>

        <article className="article">
          <div className="article-hero">
            <div className="article-card__tags article__tags">
              {meta.tags.map((tag) => (
                <span key={tag} className="article-card__tag">
                  {tag}
                </span>
              ))}
            </div>

            <header className="article__header">
              <h1>{post.title}</h1>
              <p className="article__lead">{post.excerpt}</p>
            </header>

            <footer className="article-card__meta article__meta">
              <span className="article-card__author">
                <span className="article-card__avatar" aria-hidden>
                  {initial}
                </span>
                {author}
              </span>
              {date && <time dateTime={post.publishedAt}>{date}</time>}
              {readTime && <span className="article-card__read">{readTime}</span>}
            </footer>
          </div>

          <div className="article__content">
            <div className="article__body">
              {post.body.split(/\n+/).filter(Boolean).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <footer className="article__footer">
            <Link href="/">Back to articles</Link>
            <a href={payloadAdminUrl()} target="_blank" rel="noreferrer">
              Edit in Payload admin
            </a>
          </footer>
        </article>
      </div>
    </div>
  )
}
