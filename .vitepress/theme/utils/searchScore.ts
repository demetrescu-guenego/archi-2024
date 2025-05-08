interface SearchMetrics {
  consecutiveMatches: number;
  lastMatchIndex: number;
  patternLength: number;
  stringLength: number;
  isExactMatch: boolean;
}

/**
 * Calculate search relevance score based on various matching metrics
 * Higher scores indicate better matches
 *
 * @param metrics - Object containing search match metrics
 * @returns number - Relevance score (0-1000)
 */
export const calculateSearchScore = (metrics: SearchMetrics): number => {
  if (metrics.isExactMatch) {
    return 1000;
  }

  return (
    // Consecutive matches are highly valued
    metrics.consecutiveMatches * 10 +
    // Earlier matches in the string are better
    (100 - (metrics.lastMatchIndex - metrics.patternLength)) +
    // Shorter overall strings are preferred
    (100 - metrics.stringLength)
  );
};
