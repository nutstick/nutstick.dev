import React from 'react';
import Page from './page';
import VirtualizedList from '../components/virtualized-list';
import { page, container } from './style.css';
import type { Frontmatter } from '../interfaces';

interface Props {
  frontmatter: Frontmatter;
  children: ReadonlyArray<React.ReactElement>;
}

const Blog: React.FC<Props> = ({ frontmatter, children }) => {
  console.log(window);
  return (
    <Page className={page}>
      <h1>{frontmatter?.title}</h1>
      <VirtualizedList className={container}>{children}</VirtualizedList>
    </Page>
  );
};

export default Blog;
