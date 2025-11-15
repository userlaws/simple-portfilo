import { db } from './db';

/**
 * Generates a URL-friendly slug from a title
 * @param title The title to convert to a slug
 * @returns A URL-safe slug
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Generates a unique slug, appending a number if the slug already exists
 * @param title The title to convert to a slug
 * @returns A unique URL-safe slug
 */
export const generateUniqueSlug = async (title: string): Promise<string> => {
  let slug = generateSlug(title);
  let counter = 1;
  let originalSlug = slug;

  // Check if slug exists and append number if needed
  while (await db.slugExists(slug)) {
    slug = `${originalSlug}-${counter}`;
    counter++;
  }

  return slug;
};

