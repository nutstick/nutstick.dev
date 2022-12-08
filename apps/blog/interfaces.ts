export interface Frontmatter {
  layout: 'deck' | 'page';
  title: string;
  date: string;
  description?: string;
}

export interface BlogPost {
  frontmatter: Frontmatter;
  slug: string;
}
