import { Link, useParams } from 'react-router-dom';

import blogPosts from '../../data/blogPosts';
import styles from './BlogArticle.module.css';

function BlogArticle() {
  const { slug } = useParams();

  const article = blogPosts.find(
    (post) => post.slug === slug
  );

  if (!article) {
    return (
      <main className={styles.notFound}>
        <div className={styles.notFoundInner}>
          <p className={styles.eyebrow}>404 / ARTICLE</p>

          <h1>
            Article
            <br />
            <span>not found.</span>
          </h1>

          <p>
            The article you are looking for does not exist or
            may have been moved.
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

  const relatedArticles = blogPosts
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

  const formattedDate = new Date(
    article.date
  ).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className={styles.page}>
      {/* =====================================================
          ARTICLE HERO
      ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <Link
              to="/blog"
              className={styles.backLink}
            >
              <span aria-hidden="true">←</span>
              <span>All insights</span>
            </Link>

            <span className={styles.articleNumber}>
              {article.id}
            </span>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.meta}>
              <span>{article.category}</span>
              <span>{article.readTime}</span>
              <span>{formattedDate}</span>
            </div>

            <h1>{article.title}</h1>

            <p className={styles.excerpt}>
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLE BODY
      ===================================================== */}

      <section className={styles.articleSection}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBlock}>
            <span className={styles.sidebarLabel}>
              PUBLISHED
            </span>

            <span className={styles.sidebarValue}>
              {formattedDate}
            </span>
          </div>

          <div className={styles.sidebarBlock}>
            <span className={styles.sidebarLabel}>
              READ TIME
            </span>

            <span className={styles.sidebarValue}>
              {article.readTime}
            </span>
          </div>

          <div className={styles.sidebarBlock}>
            <span className={styles.sidebarLabel}>
              CATEGORY
            </span>

            <span className={styles.sidebarValue}>
              {article.category}
            </span>
          </div>

          {article.tags?.length > 0 && (
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabel}>
                TAGS
              </span>

              <div className={styles.sidebarTags}>
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </aside>

        <article className={styles.articleBody}>
          <div className={styles.articleIntro}>
            <span className={styles.introMark}>
              RIYADVI
            </span>

            <p>
              {article.excerpt}
            </p>
          </div>

          <div className={styles.content}>
            {article.content.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={`${article.slug}-${index}`}>
                    {block.text}
                  </h2>
                );
              }

              return (
                <p key={`${article.slug}-${index}`}>
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* =================================================
              ARTICLE TAGS
          ================================================= */}

          {article.tags?.length > 0 && (
            <div className={styles.articleTags}>
              <span className={styles.tagsLabel}>
                TAGS
              </span>

              <div className={styles.tagsList}>
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
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
                insights.
              </h2>
            </div>

            <Link
              to="/blog"
              className={styles.viewAllLink}
            >
              <span>View all insights</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.relatedGrid}>
            {relatedArticles.map((relatedArticle, index) => (
              <article
                key={relatedArticle.slug}
                className={styles.relatedCard}
              >
                <div className={styles.relatedVisual}>
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div
                    className={styles.relatedOrb}
                    aria-hidden="true"
                  >
                    <span>+</span>
                  </div>
                </div>

                <div className={styles.relatedContent}>
                  <div className={styles.relatedMeta}>
                    <span>
                      {relatedArticle.category}
                    </span>

                    <span>
                      {relatedArticle.readTime}
                    </span>
                  </div>

                  <h3>{relatedArticle.title}</h3>

                  <p>{relatedArticle.excerpt}</p>

                  <Link
                    to={`/blog/${relatedArticle.slug}`}
                    className={styles.relatedLink}
                  >
                    <span>Read article</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          HAVE A PROJECT IN MIND?
        </p>

        <h2>
          Let's turn ideas
          <br />
          <span>into experiences.</span>
        </h2>

        <p>
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

export default BlogArticle;