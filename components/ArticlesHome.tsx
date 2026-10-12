'use client'

import { useMemo, useState } from 'react'
import { ArticleFilters } from './ArticleFilters'
import { PostCard } from './PostCard'
import { payloadAdminUrl, type BlogPost, type SiteInfo } from '../lib/payload'
import { allFilterTags, postMatchesFilter } from '../lib/postMeta'

type ArticlesHomeProps = {
  site: SiteInfo
  posts: BlogPost[]
  loadError?: string | null
}

export function ArticlesHome({ site, posts, loadError }: ArticlesHomeProps) {
  const [filter, setFilter] = useState('All')
  const filterTags = useMemo(() => allFilterTags(posts), [posts])
  const visiblePosts = useMemo(
    () => posts.filter((post) => postMatchesFilter(post, filter)),
    [posts, filter],
  )

  return (
    <div className="shell articles-page__main">
        <h1 className="visually-hidden">Articles</h1>
        {site.description && (
          <header className="articles-page__intro">
            <p className="articles-page__lede">{site.description}</p>
          </header>
        )}

        {posts.length > 0 && (
          <ArticleFilters tags={filterTags} active={filter} onChange={setFilter} />
        )}

        {loadError && (
          <p className="status status--error">Could not load content from Payload: {loadError}</p>
        )}

        {!loadError && (
          <section className="article-list" aria-label="Articles">
            {visiblePosts.length === 0 ? (
              <p className="status">No posts in this category.</p>
            ) : (
              visiblePosts.map((post) => <PostCard key={post.slug} post={post} />)
            )}
          </section>
        )}

        <footer className="articles-page__footer">
          <span>Content from Payload — edit in</span>
          <a href={payloadAdminUrl()} target="_blank" rel="noreferrer">
            admin
          </a>
        </footer>
    </div>
  )
}
