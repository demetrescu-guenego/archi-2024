import { calculateSearchScore } from "./searchScore";

/**
 * Fuzzy search function to check if a pattern exists in a string and returns a relevance score
 * Higher scores mean better matches
 *
 * @param str - The string to search in
 * @param pattern - The pattern to search for
 * @returns Object with match boolean and score, or null if no match
 */
export interface FuzzySearchResult {
  matches: boolean;
  score: number;
}

export const fuzzySearch = (
  str: string,
  pattern: string,
): FuzzySearchResult | null => {
  if (!pattern) return { matches: true, score: 0 };

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
  let consecutiveMatches = 0;
  let maxConsecutiveMatches = 0;
  let lastMatchIndex = -1;

  // Check for exact word match
  const isExactMatch = normalizedStr.includes(normalizedPattern);

  if (isExactMatch) {
    return {
      matches: true,
      score: calculateSearchScore({
        consecutiveMatches: normalizedPattern.length,
        lastMatchIndex: normalizedStr.indexOf(normalizedPattern),
        patternLength: normalizedPattern.length,
        stringLength: normalizedStr.length,
        isExactMatch: true,
      }),
    };
  }

  for (let i = 0; i < normalizedStr.length; i++) {
    const char = normalizedStr[i];
    if (char === letters[idx]) {
      if (lastMatchIndex === i - 1) {
        consecutiveMatches++;
        maxConsecutiveMatches = Math.max(
          maxConsecutiveMatches,
          consecutiveMatches,
        );
      } else {
        consecutiveMatches = 1;
      }
      lastMatchIndex = i;
      idx++;
      if (idx === letters.length) {
        return {
          matches: true,
          score: calculateSearchScore({
            consecutiveMatches: maxConsecutiveMatches,
            lastMatchIndex,
            patternLength: letters.length,
            stringLength: normalizedStr.length,
            isExactMatch: false,
          }),
        };
      }
    }
  }

  return null;
};
