/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DeckTemplateQuery
// ====================================================

export interface DeckTemplateQuery_deck_frontmatter {
  title: string;
}

export interface DeckTemplateQuery_deck {
  id: string;
  body: string;
  frontmatter: DeckTemplateQuery_deck_frontmatter;
}

export interface DeckTemplateQuery {
  deck: DeckTemplateQuery_deck | null;
}

export interface DeckTemplateQueryVariables {
  id: string;
}
