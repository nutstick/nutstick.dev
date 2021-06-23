/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexLayoutQuery
// ====================================================

export interface IndexLayoutQuery_site_siteMetadata_author {
  name: string;
  url: string;
  github: string | null;
  twitter: string | null;
  linkedin: string | null;
  email: string;
}

export interface IndexLayoutQuery_site_siteMetadata {
  title: string | null;
  description: string | null;
  keywords: string | null;
  author: IndexLayoutQuery_site_siteMetadata_author | null;
}

export interface IndexLayoutQuery_site {
  siteMetadata: IndexLayoutQuery_site_siteMetadata | null;
}

export interface IndexLayoutQuery {
  site: IndexLayoutQuery_site | null;
}
