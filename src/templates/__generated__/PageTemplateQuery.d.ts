/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageTemplateQuery
// ====================================================

export interface PageTemplateQuery_site_siteMetadata_author {
  name: string | null;
  url: string | null;
}

export interface PageTemplateQuery_site_siteMetadata {
  title: string | null;
  description: string | null;
  author: PageTemplateQuery_site_siteMetadata_author | null;
}

export interface PageTemplateQuery_site {
  siteMetadata: PageTemplateQuery_site_siteMetadata | null;
}

export interface PageTemplateQuery_markdownRemark_frontmatter {
  title: string | null;
}

export interface PageTemplateQuery_markdownRemark {
  html: string | null;
  excerpt: string | null;
  frontmatter: PageTemplateQuery_markdownRemark_frontmatter | null;
}

export interface PageTemplateQuery {
  site: PageTemplateQuery_site | null;
  markdownRemark: PageTemplateQuery_markdownRemark | null;
}

export interface PageTemplateQueryVariables {
  slug: string;
}
