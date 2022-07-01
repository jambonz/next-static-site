/**
 * These utils are for Next.js Static Generation (SSG) at build time
 * They are used with Next.js `getStaticProps` and `getStaticPaths`
 * https://nextjs.org/docs/basic-features/pages#static-generation-recommended
 */

const fs = require('fs');
const path = require('path');
const yamljs = require('yamljs');
const matter = require('gray-matter');
const remark = require('remark');
const remarkHtml = require('remark-html');
const remarkGfm = require('remark-gfm');
const dataDir = path.join(process.cwd(), 'data');
const markdownDir = path.join(process.cwd(), 'markdown');

function _slugify(str) {
  return str.toString().toLowerCase().trim()
    // Replace & with "and"
    .replace( /&/g, "-and-" )

    // Replace spaces, non-word characters and dashes with a single dash (-)
    .replace( /[\s\W-]+/g, "-" )

    // Replace leading trailing slashes with an empty string - nothing
    .replace( /^[-]+|[-]+$/g, "" );
}

/**
 * For accessibility issues we can "fix" our limitations with markdown and remark-html
 * The ideal solution would be to comb over every markdown file and fix our headings...
 * The issue is headings out of order, as in an h2 coming after an h3 etc...
 * @param {string} html The contentHtml to make changes to
 * @returns {Object}
 */
function _normalizeHTML(html) {
  return html
    .replace(/<(h[1-6])>(.*?)(<\/(h[1-6])>)/g, (m, p1, p2, p3) => {
      return `<div class="${p1}" id="${p1}-${_slugify(p2)}">${p2}</div>`;
    });
}

/**
 * Parse YAML data to generate the static props for Next.js page components
 * @param {string} key The fileName without extension to load from ./data
 * @returns {Object}
 */
function _getData(key) {
  const fullPath = path.join(dataDir, `${key}.yml`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return yamljs.parse(fileContents);
}

/**
 * Load YAML data to generate the static props for Next.js page components
 * @param {string} key The fileName without extension to load from ./data
 * @returns {Object}
 */
export function getData(key) {
  return {
    [key]: _getData(key),
    site: _getData('site'),
  };
}

/**
 * Load Markdown and YAML front-matter to generate the static props for Next.js docs component
 * @param {string} filePath The full path to a markdown file
 * @returns {Object}
 */
export async function getParsedMarkdown(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const fileMatter = matter(fileContents);
  const frontMatter = fileMatter.data;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(fileMatter.content);
  const contentHtml = _normalizeHTML(processedContent.toString());

  // Combine the data with the slug and contentHtml
  return {
    contentHtml,
    frontMatter,
  };
}

/**
 * Walk the markdown file tree to generate the static paths for Next.js components
 * @param {string} dirPath The full path to markdown subdirectory
 * @param {string} scope The subdirectory of ./markdown
 * @param {Array} arrayOfFiles The static paths array formatted for Next.js
 * @returns {Array}
 */
function _getMarkdownPaths(dirPath, scope, arrayOfFiles = [{params:{slug:[]}}]) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = `${dirPath}/${file}`;
    const isDirectory = fs.statSync(filePath).isDirectory();
    const isMarkdown = /\.md$/.test(file);
    let slug;

    if (isDirectory) {
      const indexFile = path.join(filePath, 'index.md');
      const isIndexFile = fs.existsSync(indexFile);
      
      if (isIndexFile) {
        slug = [
          file,
        ];

        arrayOfFiles.push({
          params: {
            slug,
          },
        });
      }

      arrayOfFiles = _getMarkdownPaths(filePath, scope, arrayOfFiles);

    } else if (isMarkdown) {
      slug = filePath
        .replace(path.join(markdownDir, scope), '')
        .replace(/\.md$/, '')
        .replace(/^\/+|\/+$/, '')
        .split('/');

      arrayOfFiles.push({
        params: {
          slug,
        },
      });
    }
  });

  return arrayOfFiles;
}

/**
 * Public method to return static props for Next.js components
 * @param {string} scope The subdirectory of ./markdown
 * @param {string} slug The markdown fileName
 * @returns {Object|null}
 */
export async function getMarkdown(scope, slug) {
  let filePath = slug ? path.join(
    markdownDir,
    scope,
    slug.join('/')
  ) : path.join(
    markdownDir,
    scope,
    'index.md'
  );
  const isDirectory = (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory());
  let isMarkdown = /\.md$/.test(filePath);

  if (isDirectory) {
    filePath = path.join(
      markdownDir,
      scope,
      slug.join('/'),
      'index.md'
    );
    isMarkdown = true;

  } else if (!isMarkdown) {
    filePath = path.join(
      markdownDir,
      scope,
      `${slug.join('/')}.md`
    );
    isMarkdown = true;
  }

  if (isMarkdown && fs.existsSync(filePath)) {
    return getParsedMarkdown(filePath);
  }

  return null;
}

/**
 * Public proxy for _getMarkdownPaths() to return static paths for Next.js components
 * @param {string} scope The subdirectory of ./markdown
 * @returns {Array}
 */
export function getMarkdownPaths(scope) {
  const paths = _getMarkdownPaths(path.join(markdownDir, scope), scope);

  return paths;
}