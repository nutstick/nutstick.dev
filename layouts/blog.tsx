import React from 'react';
import Container from '../components/container';
import Header from './header';
import LayoutMain from './main';
import { page } from './style.css';
import type { Frontmatter } from '../interfaces';

interface Props {
  frontmatter: Frontmatter;
  children: ReadonlyArray<React.ReactElement>;
}

const Blog: React.FC<Props> = ({ frontmatter, children }) => {
  return (
    <>
      <Header />
      <LayoutMain>
        <Container>
          <div className={page}>
            <h1>{frontmatter?.title}</h1>
            {children}
          </div>
        </Container>
      </LayoutMain>
    </>
  );
};

export default Blog;
