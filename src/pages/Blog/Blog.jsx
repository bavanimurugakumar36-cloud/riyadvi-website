import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import blogPosts from '../../data/blogPosts';
import styles from './Blog.module.css';

function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(blogPosts.map((post) => post.category)),
    ];

    return ['All', ...uniqueCategories];
  }, []);

  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0];

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' ||
        post.category === activeCategory;

      if (!normalizedQuery) {
        return matchesCategory;
      }

      const searchableContent = [
        post.title,
        post.excerpt,
        post.category,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return (
        matchesCategory &&
        searchableContent.includes(normalizedQuery)
      );
    });
  }, [activeCategory, searchQuery]);

  const regularPosts = filteredPosts.filter(
    (post) => post.slug !== featuredPost?.slug
  );

  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              RIYADVI / INSIGHTS
            </p>

            <h1>
              Ideas, technology
              <br />
              <span>and perspective.</span>
            </h1>

            <p className={styles.heroDescription}>
              Explore perspectives on software development,
              digital transformation, design, AI and emerging
              technologies.
            </p>
          </div>

          <div className={styles.heroMeta}>
            <span>06</span>
            <span>ARTICLES</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED ARTICLE
      ===================================================== */}

      {featuredPost && (
        <section className={styles.featuredSection}>
          <div className={styles.sectionLabel}>
            <span>01</span>
            <p>FEATURED INSIGHT</p>
          </div>

          <div className={styles.featuredCard}>
            <div className={styles.featuredVisual}>
              <div
                className={styles.visualGrid}
                aria-hidden="true"
              />

              <div
                className={styles.visualOrb}
                aria-hidden="true"
              >
                <span>R</span>
              </div>

              <div className={styles.visualMeta}>
                <span>RIYADVI / INSIGHT</span>
                <span>FEATURED</span>
              </div>
            </div>

            <div className={styles.featuredContent}>
              <div className={styles.articleMeta}>
                <span>{featuredPost.category}</span>
                <span>{featuredPost.readTime}</span>
              </div>

              <h2>{featuredPost.title}</h2>

              <p>{featuredPost.excerpt}</p>

              <div className={styles.featuredBottom}>
                <span>
                  {new Date(featuredPost.date).toLocaleDateString(
                    'en-US',
                    {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    }
                  )}
                </span>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className={styles.readLink}
                >
                  <span>Read article</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          ARTICLES
      ===================================================== */}

      <section className={styles.articlesSection}>
        <div className={styles.articlesHeader}>
          <div>
            <p className={styles.eyebrow}>
              EXPLORE THE JOURNAL
            </p>

            <h2>
              Latest
              <br />
              thinking.
            </h2>
          </div>

          <div className={styles.articleCount}>
            <span>
              {String(filteredPosts.length).padStart(2, '0')}
            </span>

            <p>RESULTS</p>
          </div>
        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <label
              htmlFor="blog-search"
              className={styles.srOnly}
            >
              Search articles
            </label>

            <input
              id="blog-search"
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search insights..."
              className={styles.searchInput}
            />

            <span
              className={styles.searchIcon}
              aria-hidden="true"
            >
              /
            </span>
          </div>

          <div
            className={styles.categoryList}
            role="tablist"
            aria-label="Article categories"
          >
            {categories.map((category) => {
              const isActive =
                category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.categoryButton} ${
                    isActive
                      ? styles.categoryButtonActive
                      : ''
                  }`}
                  onClick={() =>
                    setActiveCategory(category)
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================
            ARTICLE GRID
        ================================================= */}

        {regularPosts.length > 0 ? (
          <div className={styles.articleGrid}>
            {regularPosts.map((post, index) => (
              <article
                key={post.slug}
                className={styles.articleCard}
              >
                <div className={styles.cardVisual}>
                  <span className={styles.cardNumber}>
                    {String(index + 2).padStart(2, '0')}
                  </span>

                  <span
                    className={styles.cardCategory}
                  >
                    {post.category}
                  </span>

                  <div
                    className={styles.cardOrb}
                    aria-hidden="true"
                  >
                    <span>+</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span>
                      {new Date(
                        post.date
                      ).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>

                    <span>{post.readTime}</span>
                  </div>

                  <h3>{post.title}</h3>

                  <p>{post.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.tags}>
                      {post.tags
                        ?.slice(0, 2)
                        .map((tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        ))}
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className={styles.cardLink}
                      aria-label={`Read ${post.title}`}
                    >
                      ↗
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span>NO RESULTS</span>

            <h3>
              Nothing matched your search.
            </h3>

            <p>
              Try another keyword or select a different
              category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className={styles.resetButton}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          HAVE A PROJECT IN MIND?
        </p>

        <h2>
          Let's turn an idea
          <br />
          <span>into something real.</span>
        </h2>

        <p className={styles.ctaDescription}>
          Tell us about your business challenge, digital idea
          or next technology initiative.
        </p>

        <Link
          to="/contact"
          className={styles.ctaButton}
        >
          <span>Start a Conversation</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

export default Blog;