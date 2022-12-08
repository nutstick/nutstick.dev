import React from 'react';
import Link from 'next/link';
import { post, header } from './style.css';
import type { BlogPost } from '../../interfaces';

interface Props extends BlogPost {}

const Post: React.FC<Props> = ({ frontmatter, slug }) => {
  const title = frontmatter?.title || slug;

  return (
    <article>
      <header className={header}>
        <Link href={slug ?? '/not-found'}>
          <h4
            className={post}
            style={{
              fontSize: '1.563rem',
            }}
          >
            {title}
          </h4>
        </Link>
        <small>{frontmatter?.date}</small>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: frontmatter?.description ?? '',
          }}
        />
      </section>
    </article>
  );
};

export default Post;
