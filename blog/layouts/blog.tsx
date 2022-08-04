import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Page from './page';
import VirtualizedList from '../components/virtualized-list';
import { Pre, Split, Terminal, Li, ThemeImage } from '../components/mdx/blog';
import { page, container } from './style.css';
import type { Frontmatter } from '../interfaces';

interface Props {
  frontmatter: Frontmatter;
}

export const Container: React.FC<{
  children: ReadonlyArray<React.ReactElement>;
}> = ({ children }) => {
  return <VirtualizedList className={container}>{children}</VirtualizedList>;
};

const Blog: React.FC<Props> = ({ frontmatter, children }) => {
  return (
    <MDXProvider
      components={{
        pre: Pre,
        li: Li,
        Split,
        Terminal,
        ThemeImage,
      }}
    >
      <Page className={page}>
        <h1>{frontmatter?.title}</h1>
        {children}
      </Page>
    </MDXProvider>
  );
};

export default Blog;
