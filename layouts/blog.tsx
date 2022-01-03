import React from 'react';
import Page from './page';
import { page } from './style.css';
import type { Frontmatter } from '../interfaces';

interface Props {
  frontmatter: Frontmatter;
  children: ReadonlyArray<React.ReactElement>;
}

const Blog: React.FC<Props> = ({ frontmatter, children }) => {
  return (
    <Page>
      <div className={page}>
        <h1>{frontmatter?.title}</h1>
        {children}
      </div>
    </Page>
  );
};

export default Blog;
