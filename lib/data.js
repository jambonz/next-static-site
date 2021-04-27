const fs = require('fs');
const path = require('path');
const yamljs = require('yamljs');
const matter = require('gray-matter');
const remark = require('remark');
const remarkHtml = require('remark-html');
const remarkGfm = require('remark-gfm');
const dataDir = path.join(process.cwd(), 'data');
const docsDir = path.join(process.cwd(), 'docs');

/******************************************************************************
 * Static page data
*******************************************************************************/
function _getData(key) {
  const fullPath = path.join(dataDir, `${key}.yml`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return yamljs.parse(fileContents);
}

// Load YAML data to generate the static props for Next.js page components
export function getData(key) {
  return {
    [key]: _getData(key),
    site: _getData('site'),
  };
}

/******************************************************************************
 * Static developer docs data
*******************************************************************************/
function _getCleanSlug(slug) {
  return slug
    .replace(docsDir, '')
    .replace(/^\/+|\/+$/, '')
    .split('/');
}

// Load Markdown and YAML front-matter to generate the static props for Next.js docs component
async function _getDocs(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const fileMatter = matter(fileContents);
  const frontMatter = fileMatter.data;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(fileMatter.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    contentHtml,
    frontMatter,
  };
}

// Walk the pages/docs file tree to generate the static paths for Next.js docs pages
function _getDocsPaths(dirPath, arrayOfFiles = [{params:{slug:[]}}]) {
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
        slug = _getCleanSlug(path.join(
          __dirname,
          dirPath,
          '/',
          file
        ));

        arrayOfFiles.push({
          params: {
            slug,
          },
        });
      }

      arrayOfFiles = _getDocsPaths(filePath, arrayOfFiles);

    } else if (isMarkdown) {
      slug = _getCleanSlug(path.join(
        __dirname,
        dirPath,
        '/',
        file.replace(/\.md$/, '')
      ));

      arrayOfFiles.push({
        params: {
          slug,
        },
      });
    }
  });

  return arrayOfFiles;
}

// Public proxy for _getDocs() to return static props for Next.js docs component
export async function getDocs(slug) {
  let filePath = slug ? path.join(
    docsDir,
    slug.join('/')
  ) : path.join(
    docsDir,
    'index.md'
  );
  const isDirectory = (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory());
  let isMarkdown = /\.md$/.test(filePath);

  if (isDirectory) {
    filePath = path.join(
      docsDir,
      slug.join('/'),
      'index.md'
    );
    isMarkdown = true;

  } else if (!isMarkdown) {
    filePath = path.join(
      docsDir,
      `${slug.join('/')}.md`
    );
    isMarkdown = true;
  }

  if (isMarkdown && fs.existsSync(filePath)) {
    return _getDocs(filePath);
  }

  return null;
}

// Public proxy for _getDocsPaths() to return static paths for Next.js docs pages
export function getDocsPaths() {
  const paths = _getDocsPaths(docsDir);

  return paths;
}