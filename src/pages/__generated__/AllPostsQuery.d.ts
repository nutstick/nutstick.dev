/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllPostsQuery
// ====================================================

export interface AllPostsQuery_allMarkdownRemark_edges_node_fields {
  slug: string | null;
}

export interface AllPostsQuery_allMarkdownRemark_edges_node_frontmatter {
  date: any | null;
  title: string | null;
  description: string | null;
}

export interface AllPostsQuery_allMarkdownRemark_edges_node {
  excerpt: string | null;
  fields: AllPostsQuery_allMarkdownRemark_edges_node_fields | null;
  frontmatter: AllPostsQuery_allMarkdownRemark_edges_node_frontmatter | null;
}

export interface AllPostsQuery_allMarkdownRemark_edges {
  node: AllPostsQuery_allMarkdownRemark_edges_node;
}

export interface AllPostsQuery_allMarkdownRemark {
  edges: AllPostsQuery_allMarkdownRemark_edges[];
}

export interface AllPostsQuery_allDeck_edges_node_frontmatter {
  date: any;
  title: string;
  description: string;
}

export interface AllPostsQuery_allDeck_edges_node {
  id: string;
  slug: string;
  frontmatter: AllPostsQuery_allDeck_edges_node_frontmatter;
}

export interface AllPostsQuery_allDeck_edges {
  node: AllPostsQuery_allDeck_edges_node;
}

export interface AllPostsQuery_allDeck {
  edges: AllPostsQuery_allDeck_edges[];
}

export interface AllPostsQuery {
  allMarkdownRemark: AllPostsQuery_allMarkdownRemark;
  allDeck: AllPostsQuery_allDeck;
}
