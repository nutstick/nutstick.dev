import React from 'react';
import BlogList from '../components/blog-list';
import Profile from '../components/profile/index.client';
import Page from '../layouts/page';

import type { NextPage } from 'next';
import type { BlogPost } from '../interfaces';

const allPosts: BlogPost[] = [
  {
    slug: 'react-tutorial-1-bootstrap',
    frontmatter: require('./react-tutorial-1-bootstrap.mdx').frontmatter,
  },
  {
    slug: 'react-tutorial-2-first-react-component',
    frontmatter: require('./react-tutorial-2-first-react-component.mdx')
      .frontmatter,
  },
  {
    slug: 'react-tutorial-3-meet-use-state',
    frontmatter: require('./react-tutorial-3-meet-use-state.mdx').frontmatter,
  },
  {
    slug: 'react-tutorial-4-fetch',
    frontmatter: require('./react-tutorial-4-fetch.mdx').frontmatter,
  },
  {
    slug: 'react-native-metro',
    frontmatter: require('./react-native-metro.mdx').frontmatter,
  },
  {
    slug: 'sneak-peak-reanimated-2',
    frontmatter: require('./sneak-peak-reanimated-2.mdx').frontmatter,
  },
];

const Home: NextPage = () => {
  return (
    <Page>
      <Profile />
      <BlogList posts={allPosts} />
    </Page>
  );
};

export default Home;
