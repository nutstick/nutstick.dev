declare module 'mdx-utils' {
  import type { Language } from 'prism-react-renderer';

  export function preToCodeBlock(props: any): {
    codeString: string;
    language: Language;
    className: `${Language}-css`;
    mdxType: 'code';
    metastring: string;
    originalType: string;
    parentName: string;
    [key: string]: string;
  };
}
