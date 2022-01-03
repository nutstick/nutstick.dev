import React from 'react';
import Post from '../post';
import type { BlogPost } from '../../interfaces';

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((item) => (
        <Post key={item.slug} {...item} />
      ))}
    </>
  );
};

export default BlogList;
