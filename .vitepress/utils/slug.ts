/**
 * Converts a given string to a URL-friendly slug.
 *
 * The function normalizes the input string, removes diacritics,
 * replaces spaces and apostrophes with hyphens, removes non-alphanumeric
 * characters (except hyphens), and converts the result to lowercase.
 *
 * @param text - The input string to be converted into a slug.
 * @returns The slugified version of the input string.
 */
export const toSlug = (text: string) => {
  text = text.normalize("NFD");

  const result = text
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ ']/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();

  return result;
};
