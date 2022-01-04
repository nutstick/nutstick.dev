declare module 'mdx-utils' {
  export function preToCodeBlock(props: any): {
    codeString: string;
    language: Language;
  };
}
