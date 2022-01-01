export interface Frontmatter {
  layout: string;
  title: string;
  date: string;
  description?: string;
}

export interface BlogPost {
  frontmatter: Frontmatter;
  slug: string;
}
