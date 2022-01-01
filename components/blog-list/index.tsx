import React from 'react';
import Post from '../post';
import type { BlogPost } from '../../interfaces';

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((item) => {
        if (item.frontmatter.layout === 'page') {
          return <Post key={item.slug} {...item} />;
        }

        // if (!item.node.frontmatter) {
        //   return null;
        // }

        // const { title, description } = item.node.frontmatter;
        // return (
        //   <article key={item.node.slug}>
        //     <header>
        //       <h3>
        //         <Link style={{ boxShadow: 'none' }} to={item.node.slug}>
        //           {title}
        //         </Link>
        //       </h3>
        //       <small>{item.node.frontmatter.date}</small>
        //     </header>
        //     <section>
        //       <p
        //         dangerouslySetInnerHTML={{
        //           __html: description ?? '',
        //         }}
        //       />
        //     </section>
        //   </article>
        // );
      })}
    </>
  );
};

export default BlogList;
