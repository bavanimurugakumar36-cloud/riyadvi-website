import {
  lazy,
  Suspense,
  useMemo,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import blogPosts from '../../data/blogPosts';
import styles from './BlogArticle.module.css';

const BlogArticleScene = lazy(
  () => import('../../three/scenes/BlogArticleScene.jsx')
);

function SceneLoader() {
  return (
    <div
      className={styles.sceneLoader}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </div>
  );
}

function BlogArticle() {
  const { slug } = useParams();

  const article = blogPosts.find(
    (post) => post.slug === slug
  );

  const relatedArticles = useMemo(() => {
    if (!article) {
      return [];
    }

    return blogPosts
      .filter(
        (post) =>
          post.slug !== article.slug &&
          (
            post.category === article.category ||
            post.tags?.some((tag) =>
              article.tags?.includes(tag)
            )
          )
      )
      .slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <main className={styles.notFound}>
        <div className={styles.notFoundGrid} />

        <div className={styles.notFoundGlow} />

        <div className={styles.notFoundInner}>
          <p className={styles.eyebrow}>
            404 / ARTICLE
          </p>

          <h1>
            Article
            <br />
            <span>not found.</span>
          </h1>

          <p>
            The article you are looking for does not
            exist or may have been moved.
          </p>

          <Link
            to="/blog"
            className={styles.backButton}
          >
            <span>Back to insights</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(
    article.date
  ).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const articleNumber = String(
    article.id ?? '01'
  ).padStart(2, '0');

  return (
    <main className={styles.page}>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGrid} />

        <div className={styles.heroGlow} />

        <div className={styles.heroInner}>

          {/* TOP BAR */}

          <div className={styles.heroTop}>
            <Link
              to="/blog"
              className={styles.backLink}
            >
              <span aria-hidden="true">←</span>
              <span>All insights</span>
            </Link>

            <span className={styles.articleNumber}>
              {articleNumber}
            </span>
          </div>

          {/* HERO CONTENT */}

          <div className={styles.heroLayout}>

            <div className={styles.heroCopy}>

              <div className={styles.meta}>
                <span>
                  {article.category}
                </span>

                <span>
                  {article.readTime}
                </span>

                <span>
                  {formattedDate}
                </span>
              </div>

              <h1>
                {article.title}
              </h1>

              <p className={styles.excerpt}>
                {article.excerpt}
              </p>

              <div className={styles.heroBottomLine}>
                <span>
                  RIYADVI / INSIGHT
                </span>

                <span>
                  SCROLL TO EXPLORE
                </span>
              </div>
            </div>

            {/* 3D HERO */}

            <div className={styles.heroVisual}>

              <div className={styles.heroVisualFrame}>
                <span
                  className={`${styles.frameCorner} ${styles.frameCornerTL}`}
                />
                <span
                  className={`${styles.frameCorner} ${styles.frameCornerTR}`}
                />
                <span
                  className={`${styles.frameCorner} ${styles.frameCornerBL}`}
                />
                <span
                  className={`${styles.frameCorner} ${styles.frameCornerBR}`}
                />

                <div className={styles.sceneLabels}>
                  <span className={styles.sceneLabelPeople}>
                    <i />
                    PEOPLE
                  </span>

                  <span className={styles.sceneLabelInnovation}>
                    <i />
                    INNOVATION
                  </span>

                  <span className={styles.sceneLabelTechnology}>
                    <i />
                    TECHNOLOGY
                  </span>

                  <span className={styles.sceneLabelGrowth}>
                    <i />
                    GROWTH
                  </span>
                </div>

                <Suspense fallback={<SceneLoader />}>
                  <BlogArticleScene
                    category={article.category}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLE BODY
      ===================================================== */}

      <section className={styles.articleSection}>

        {/* SIDEBAR */}

        <aside className={styles.sidebar}>

          <div className={styles.sidebarBlock}>
            <span className={styles.sidebarIcon}>
              ◫
            </span>

            <span className={styles.sidebarLabel}>
              PUBLISHED
            </span>

            <span className={styles.sidebarValue}>
              {formattedDate}
            </span>
          </div>

          <div className={styles.sidebarBlock}>
            <span className={styles.sidebarIcon}>
              ◷
            </span>

            <span className={styles.sidebarLabel}>
              READ TIME
            </span>

            <span className={styles.sidebarValue}>
              {article.readTime}
            </span>
          </div>

          <div className={styles.sidebarBlock}>
            <span className={styles.sidebarIcon}>
              □
            </span>

            <span className={styles.sidebarLabel}>
              CATEGORY
            </span>

            <span className={styles.sidebarValue}>
              {article.category}
            </span>
          </div>

          {article.tags?.length > 0 && (
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarIcon}>
                ◇
              </span>

              <span className={styles.sidebarLabel}>
                TAGS
              </span>

              <div className={styles.sidebarTags}>
                {article.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ARTICLE */}

        <article className={styles.articleBody}>

          <div className={styles.articleBodyVisual}>
            <div className={styles.bodyOrbit} />
            <div className={styles.bodyOrbitSmall} />
            <div className={styles.bodyGlow} />
          </div>

          <div className={styles.articleIntro}>
            <div className={styles.introHeader}>
              <span className={styles.introMark}>
                RIYADVI INSIGHT
              </span>

              <span className={styles.introLine} />
            </div>

            <p>
              {article.excerpt}
            </p>
          </div>

          <div className={styles.content}>
            {article.content.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <div
                    className={styles.contentHeading}
                    key={`${article.slug}-heading-${index}`}
                  >
                    <span>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h2>
                      {block.text}
                    </h2>
                  </div>
                );
              }

              return (
                <p
                  key={`${article.slug}-paragraph-${index}`}
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* TAGS */}

          {article.tags?.length > 0 && (
            <div className={styles.articleTags}>
              <span className={styles.tagsLabel}>
                TAGS
              </span>

              <div className={styles.tagsList}>
                {article.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </section>

      {/* =====================================================
          RELATED ARTICLES
      ===================================================== */}

      {relatedArticles.length > 0 && (
        <section className={styles.relatedSection}>

          <div className={styles.relatedHeader}>

            <div>
              <p className={styles.eyebrow}>
                CONTINUE READING
              </p>

              <h2>
                Related
                <br />
                <span>insights.</span>
              </h2>
            </div>

            <Link
              to="/blog"
              className={styles.viewAllLink}
            >
              <span>
                View all insights
              </span>

              <span aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          <div className={styles.relatedGrid}>

            {relatedArticles.map(
              (relatedArticle, index) => (
                <article
                  key={relatedArticle.slug}
                  className={styles.relatedCard}
                >

                  <div className={styles.relatedVisual}>

                    <div className={styles.relatedGridLines} />

                    <span className={styles.relatedNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className={styles.relatedCategory}>
                      {relatedArticle.category}
                    </span>

                    <div className={styles.relatedOrb}>
                      <div className={styles.relatedOrbCore}>
                        <span>
                          {index === 0
                            ? '+'
                            : index === 1
                              ? 'R'
                              : '•'}
                        </span>
                      </div>

                      <span className={styles.relatedRingOne} />
                      <span className={styles.relatedRingTwo} />
                      <span className={styles.relatedRingThree} />
                    </div>
                  </div>

                  <div className={styles.relatedContent}>

                    <div className={styles.relatedMeta}>
                      <span>
                        {new Date(
                          relatedArticle.date
                        ).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>

                      <span>
                        {relatedArticle.readTime}
                      </span>
                    </div>

                    <h3>
                      {relatedArticle.title}
                    </h3>

                    <p>
                      {relatedArticle.excerpt}
                    </p>

                    <Link
                      to={`/blog/${relatedArticle.slug}`}
                      className={styles.relatedLink}
                    >
                      <span>
                        Read article
                      </span>

                      <span aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className={styles.cta}>

        <div className={styles.ctaOrbitOne} />
        <div className={styles.ctaOrbitTwo} />
        <div className={styles.ctaGlow} />

        <div className={styles.ctaInner}>

          <div>
            <p className={styles.eyebrow}>
              HAVE A PROJECT IN MIND?
            </p>

            <h2>
              Let&apos;s turn ideas
              <br />
              <span>
                into experiences.
              </span>
            </h2>
          </div>

          <div className={styles.ctaRight}>

            <p>
              Tell us about your business challenge,
              digital idea or next technology initiative.
            </p>

            <Link
              to="/contact"
              className={styles.ctaButton}
            >
              <span>
                Start a Conversation
              </span>

              <span aria-hidden="true">
                →
              </span>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

export default BlogArticle;