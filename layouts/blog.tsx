import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Page from './page';
import VirtualizedList from '../components/virtualized-list';
import { Pre, Split, Terminal, Li } from '../components/mdx/blog';
import { page, container } from './style.css';
import type { Frontmatter } from '../interfaces';

interface Props {
  frontmatter: Frontmatter;
  children: ReadonlyArray<React.ReactElement>;
}

const Blog: React.FC<Props> = ({ frontmatter, children }) => {
  return (
    <MDXProvider
      components={{
        pre: Pre,
        li: Li,
        Split,
        Terminal,
      }}
    >
      <Page className={page}>
        <h1>{frontmatter?.title}</h1>
        <VirtualizedList className={container}>{children}</VirtualizedList>
      </Page>
    </MDXProvider>
  );
};

export default Blog;
