export const rSlash = /^\/|\/$/g;

// Normalize how we work with the subtext as an array[]
export function normalizeSubtext(subtext) {
  if (!Array.isArray(subtext)) {
    subtext = [subtext];
  }

  return subtext;
}

// Simple method to normalize string as slug
export function normalizeSlug(key) {
  return String(key.toLowerCase()).split(' ').join('-');
}