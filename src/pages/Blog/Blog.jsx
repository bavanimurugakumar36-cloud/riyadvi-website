import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import blogPosts from '../../data/blogPosts';
import styles from './Blog.module.css';

const BlogScene = lazy(
  () => import('../../three/scenes/BlogScene.jsx')
);

const PAGE_SIZE = 6;

function SceneLoader() {
  return (
    <div className={styles.sceneLoader} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function formatDate(date, month = 'short') {
  return new Date(date).toLocaleDateString('en-US', {
    month,
    day: 'numeric',
    year: 'numeric',
  });
}

function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(0);

  /* Measure the real navbar height (no scroll snapping) */
  useEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const navEl =
        document.querySelector('header') ||
        document.querySelector('nav');

      const navHeight = navEl
        ? Math.round(navEl.getBoundingClientRect().height)
        : 78;

      root.style.setProperty('--nav', `${navHeight}px`);
    };

    apply();
    window.addEventListener('resize', apply);

    return () => {
      window.removeEventListener('resize', apply);
      root.style.removeProperty('--nav');
    };
  }, []);

  const categories = useMemo(() => {
    const unique = [
      ...new Set(blogPosts.map((post) => post.category)),
    ];
    return ['All', ...unique];
  }, []);

  const featuredPost =
    blogPosts.find((post) => post.featured) || blogPosts[0];

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' ||
        post.category === activeCategory;

      if (!q) return matchesCategory;

      const text = [
        post.title,
        post.excerpt,
        post.category,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && text.includes(q);
    });
  }, [activeCategory, searchQuery]);

  const regularPosts = filteredPosts.filter(
    (post) => post.slug !== featuredPost?.slug
  );

  const totalPages = Math.max(
    1,
    Math.ceil(regularPosts.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages - 1);

  const visiblePosts = regularPosts.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <main className={styles.page}>
      {/* =====================================================
          SCREEN 1 — HERO
      ===================================================== */}

      <section className={`${styles.screen} ${styles.hero}`}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <p className={styles.eyebrow}>RIYADVI / INSIGHTS</p>

            <div className={styles.heroCounter}>
              <span>
                {String(blogPosts.length).padStart(2, '0')}
              </span>
              <small>ARTICLES</small>
            </div>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <h1>
                Ideas,
                <br />
                <span>technology</span>
                <br />
                and perspective.
              </h1>

              <p className={styles.heroDescription}>
                Explore perspectives on software development,
                digital transformation, design, AI and emerging
                technologies.
              </p>

              <div className={styles.heroBottom}>
                <span>RIYADVI SOFTWARE TECHNOLOGIES</span>
                <span>SCROLL TO EXPLORE ↓</span>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualFrame}>
                <div className={styles.visualLabels}>
                  <span className={styles.labelOne}>
                    <i />
                    AI
                  </span>
                  <span className={styles.labelTwo}>
                    <i />
                    DESIGN
                  </span>
                  <span className={styles.labelThree}>
                    <i />
                    TECHNOLOGY
                  </span>
                  <span className={styles.labelFour}>
                    <i />
                    FUTURE
                  </span>
                </div>

                <Suspense fallback={<SceneLoader />}>
                  <BlogScene />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SCREEN 2 — FEATURED
      ===================================================== */}

      {featuredPost && (
        <section
          className={`${styles.screen} ${styles.featuredSection}`}
        >
          <div className={styles.screenInner}>
            <div className={styles.sectionHeader}>
              <div>
                <span>01</span>
                <p>FEATURED INSIGHT</p>
              </div>
              <span>EDITORIAL / 2026</span>
            </div>

            <div className={styles.featuredCard}>
              <div className={styles.featuredVisual}>
                <div className={styles.featuredGrid} />

                <div className={styles.featuredOrb}>
                  <span className={styles.orbitA} />
                  <span className={styles.orbitB} />
                  <span className={styles.orbitC} />
                  <div>R</div>
                </div>

                <span className={styles.featuredVisualNumber}>
                  01
                </span>
                <span className={styles.featuredVisualCategory}>
                  {featuredPost.category}
                </span>
                <span className={styles.featuredVisualBottom}>
                  RIYADVI / INSIGHT
                </span>
              </div>

              <div className={styles.featuredContent}>
                <div className={styles.articleMeta}>
                  <span>{featuredPost.category}</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>

                <div className={styles.featuredFooter}>
                  <span>
                    {formatDate(featuredPost.date, 'long')}
                  </span>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className={styles.readLink}
                  >
                    <span>Read article</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          SCREEN 3 — ARTICLES
      ===================================================== */}

      <section
        className={`${styles.screen} ${styles.articlesSection}`}
      >
        <div className={styles.screenInner}>
          <div className={styles.articlesHeader}>
            <div>
              <p className={styles.eyebrow}>EXPLORE THE JOURNAL</p>
              <h2>
                Latest <span>thinking.</span>
              </h2>
            </div>

            <div className={styles.resultCounter}>
              <span>
                {String(filteredPosts.length).padStart(2, '0')}
              </span>
              <small>RESULTS</small>
            </div>
          </div>

          <div className={styles.filters}>
            <div className={styles.searchBox}>
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
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setPage(0);
                }}
                placeholder="Search insights..."
              />

              <span>/</span>
            </div>

            <div className={styles.categoryList}>
              {categories.map((category) => {
                const isActive = category === activeCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    className={[
                      styles.categoryButton,
                      isActive ? styles.categoryButtonActive : '',
                    ].join(' ')}
                    onClick={() => {
                      setActiveCategory(category);
                      setPage(0);
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {visiblePosts.length > 0 ? (
            <>
              <div className={styles.articleGrid}>
                {visiblePosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className={styles.articleCard}
                  >
                    <div className={styles.cardVisual}>
                      <div className={styles.cardGrid} />

                      <span className={styles.cardNumber}>
                        {String(
                          currentPage * PAGE_SIZE + index + 2
                        ).padStart(2, '0')}
                      </span>

                      <span className={styles.cardCategory}>
                        {post.category}
                      </span>

                      <div className={styles.cardOrb}>
                        <span className={styles.cardRingOne} />
                        <span className={styles.cardRingTwo} />
                        <span className={styles.cardRingThree} />
                        <div>
                          {index % 3 === 0
                            ? '+'
                            : index % 3 === 1
                              ? 'R'
                              : '•'}
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.cardMeta}>
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3>{post.title}</h3>

                      <p className={styles.cardExcerpt}>
                        {post.excerpt}
                      </p>

                      <div className={styles.cardFooter}>
                        <div className={styles.tags}>
                          {post.tags?.slice(0, 2).map((tag) => (
                            <span key={tag}>{tag}</span>
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

              {totalPages > 1 && (
                <div className={styles.pager}>
                  <button
                    type="button"
                    disabled={currentPage === 0}
                    onClick={() => setPage(currentPage - 1)}
                  >
                    ← Prev
                  </button>

                  <span>
                    {String(currentPage + 1).padStart(2, '0')} /{' '}
                    {String(totalPages).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => setPage(currentPage + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <span>NO RESULTS</span>
              <h3>Nothing matched your search.</h3>
              <p>
                Try another keyword or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setPage(0);
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          SCREEN 4 — CTA
      ===================================================== */}

      <section className={`${styles.screen} ${styles.cta}`}>
        <div className={styles.ctaGrid} />

        <div className={styles.ctaOrb}>
          <span />
          <span />
          <span />
        </div>

        <div className={styles.ctaInner}>
          <div>
            <p className={styles.eyebrow}>HAVE A PROJECT IN MIND?</p>

            <h2>
              Let&apos;s turn an idea
              <br />
              <span>into something real.</span>
            </h2>
          </div>

          <div className={styles.ctaRight}>
            <p>
              Tell us about your business challenge, digital idea
              or next technology initiative.
            </p>

            <Link to="/contact" className={styles.ctaButton}>
              <span>Start a Conversation</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;