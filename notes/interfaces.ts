export type ID = number | string;

export interface Note {
  id: ID;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}
