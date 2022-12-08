import { visit } from 'unist-util-visit';

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

/** @type {import('unified').Plugin<Array<void>, import('hast').Root>} */
export default function (options = {}) {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        node.properties.meta = node.data.meta;
      }
    });
  };
}
