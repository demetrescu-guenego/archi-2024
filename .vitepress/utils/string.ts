/**
 * Normalize the text by removing accents and converting to lowercase.
 * @param text
 */
export const normalizeText = (text: string) => {
  return text
    .normalize("NFD") // diacritics are separated from letters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase();
};

export const processText = (text: string) => {
  return text.replace(/<br\s*\/?>/gi, "\n");
};

export function findContiguousMatch(text: string, pattern: string) {
  for (let i = 0; i <= text.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      return { index: i, length: pattern.length };
    }
  }
  return null;
}

// Helper for non-contiguous match
export function findNonContiguousMatch(text: string, pattern: string) {
  let patternIndex = 0;
  const highlighted: number[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === pattern[patternIndex]) {
      highlighted.push(i);
      patternIndex++;
      if (patternIndex === pattern.length) {
        return {
          index: highlighted[0],
          length: highlighted[highlighted.length - 1] - highlighted[0] + 1,
          indices: highlighted,
        };
      }
    }
  }
  return null;
}

export const findMatches = (text: string, pattern: string) => {
  const matches: { index: number; length: number; indices?: number[] }[] = [];

  // Prefer contiguous match
  const contiguous = findContiguousMatch(text, pattern);
  if (contiguous) {
    matches.push(contiguous);
    return matches;
  }

  // Fallback: non-contiguous match
  const nonContiguous = findNonContiguousMatch(text, pattern);
  if (nonContiguous) {
    matches.push(nonContiguous);
  }
  return matches;
};
