import React from 'react';
import { graphql } from 'gatsby';
import Element from '../../components/transitions/elements';

import Container from '../../components/container';

interface PageTemplateProps {
  data: GatsbyTypes.PageTemplateQueryQuery;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const markdownRemark = data?.markdownRemark;
  if (markdownRemark && markdownRemark.frontmatter && markdownRemark.html) {
    const { title } = markdownRemark.frontmatter;
    return (
      <Container>
        <Element.Heading id={`post-${title}`} fontSize="2.441rem" color="#fff">
          {title}
        </Element.Heading>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </Container>
    );
  }
  return null;
};

export default PageTemplate;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`;
