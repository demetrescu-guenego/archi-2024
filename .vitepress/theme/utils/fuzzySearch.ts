/**
 * Fuzzy search function to check if a pattern exists in a string.
 * It checks if the characters of the pattern appear in the string in the same order,
 * but not necessarily consecutively.
 * the pattern is diacritics insensitive.
 *
 * @param str - The string to search in.
 * @param pattern - The pattern to search for.
 * @returns True if the pattern is found in the string, false otherwise.
 *
 * @example
 * fuzzySearch("hello world", "hlo") // true
 * fuzzySearch("hello world", "hloz") // false
 * fuzzySearch("hello world", "") // true
 * fuzzySearch("Guénégo", "uen") // true
 */
export const fuzzySearch = (str: string, pattern: string): boolean => {
  if (!pattern) return true;

  // Check if the pattern is a substring of the string without diacritics
  const patternWithoutDiacritics = pattern
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const strWithoutDiacritics = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const letters = patternWithoutDiacritics.toLowerCase().split("");
  let idx = 0;

  for (const char of strWithoutDiacritics.toLowerCase()) {
    if (char === letters[idx]) {
      idx++;
      if (idx === letters.length) return true;
    }
  }

  return false;
};
