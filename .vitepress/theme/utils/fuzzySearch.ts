/**
 * Fuzzy search function to check if a pattern exists in a string.
 * Spaces are ignored in both the search pattern and the target string.
 *
 * @param str - The string to search in.
 * @param pattern - The pattern to search for.
 * @returns True if the pattern is found in the string, false otherwise.
 *
 * @example
 * fuzzySearch("hello world", "hw") // true
 * fuzzySearch("hello world", "h w") // true
 * fuzzySearch("Saint-Pierre", "stp") // true
 * fuzzySearch("Saint Pierre", "s tp") // true
 */
export const fuzzySearch = (str: string, pattern: string): boolean => {
  if (!pattern) return true;

  // Remove spaces and normalize strings
  const normalizedStr = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();

  const normalizedPattern = pattern
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();

  const letters = normalizedPattern.split("");
  let idx = 0;

  for (const char of normalizedStr) {
    if (char === letters[idx]) {
      idx++;
      if (idx === letters.length) return true;
    }
  }

  return false;
};
