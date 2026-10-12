import { ArticlesHome } from '../components/ArticlesHome'
import { SiteHeader } from '../components/SiteHeader'
import { fetchBlogPosts, fetchSiteInfo } from '../lib/payload'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let site = { title: 'Payload on Zerops', description: '' }
  let posts: Awaited<ReturnType<typeof fetchBlogPosts>> = []
  let loadError: string | null = null

  try {
    site = await fetchSiteInfo()
    posts = await fetchBlogPosts()
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Unknown error'
  }

  return (
    <div className="articles-page">
      <SiteHeader />
      <ArticlesHome site={site} posts={posts} loadError={loadError} />
    </div>
  )
}
