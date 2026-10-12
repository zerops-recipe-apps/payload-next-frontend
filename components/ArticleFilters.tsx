type ArticleFiltersProps = {
  tags: string[]
  active: string
  onChange: (tag: string) => void
}

export function ArticleFilters({ tags, active, onChange }: ArticleFiltersProps) {
  const options = ['All', ...tags]

  return (
    <div className="article-filters" role="tablist" aria-label="Filter articles">
      {options.map((tag) => (
        <button
          key={tag}
          type="button"
          role="tab"
          aria-selected={active === tag}
          className={
            active === tag
              ? 'article-filters__pill article-filters__pill--active'
              : 'article-filters__pill'
          }
          onClick={() => onChange(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
