import React from 'react';
import BlogList from '../components/blog-list';
import Profile from '../components/profile/index.client';
import Page from '../layouts/page';
import fs from 'fs';

import type { NextPage } from 'next';
import type { BlogPost } from '../interfaces';

const Home: NextPage<{ allPosts: BlogPost[] }> = ({ allPosts }) => {
  return (
    <Page>
      <Profile />
      <BlogList posts={allPosts} />
    </Page>
  );
};

export async function getStaticProps() {
  const allPosts = await Promise.all(
    fs
      .readdirSync('./pages')
      .filter((file) => /\.mdx$/.test(file))
      .map(async (file): Promise<BlogPost> => {
        const { frontmatter } = await import(`./${file}`);
        return {
          slug: file.replace('.mdx', ''),
          frontmatter,
        };
      })
  );
  return {
    props: {
      allPosts: allPosts.sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      ),
    },
  };
}

export default Home;
