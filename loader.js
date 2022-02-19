const matter = require('gray-matter');
const path = require('path');

module.exports = function (src) {
  const done = this.async();
  const { content, data } = matter(src);
  const importPath = path.relative(
    path.dirname(this.resourcePath),
    path.join(__dirname, 'layouts', data.layout || 'blog')
  );

  const code = [
    `import Layout from "${importPath}";`,
    `import { Container as ___Fragment } from "${importPath}";`,
    `export const frontmatter = ${JSON.stringify(data)};`,
    content,
    `export default ({ children }) => <Layout frontmatter={frontmatter}>{children}</Layout>;`,
  ].join('\n');

  return done(null, code);
};
