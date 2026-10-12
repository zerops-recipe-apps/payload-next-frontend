import Link from 'next/link'
import type { BlogPost } from '../lib/payload'
import { formatDate } from '../lib/payload'
import { estimateReadTime, getPostMeta } from '../lib/postMeta'

type PostCardProps = {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  const date = formatDate(post.publishedAt)
  const { tags, author } = getPostMeta(post)
  const readTime = estimateReadTime(`${post.excerpt} ${post.body}`)
  const initial = author.charAt(0).toUpperCase()

  return (
    <Link href={`/posts/${post.slug}`} className="article-card article-card--link">
      <div className="article-card__tags">
        {tags.map((tag) => (
          <span key={tag} className="article-card__tag">{tag}</span>
        ))}
      </div>
      <h3 className="article-card__title">{post.title}</h3>
      <p className="article-card__excerpt">{post.excerpt}</p>
      <footer className="article-card__meta">
        <span className="article-card__author">
          <span className="article-card__avatar" aria-hidden>{initial}</span>
          {author}
        </span>
        {date && <time dateTime={post.publishedAt}>{date}</time>}
        <span className="article-card__read">{readTime}</span>
      </footer>
    </Link>
  )
}
