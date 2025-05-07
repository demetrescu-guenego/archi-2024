export const fuzzySearch = (str: string, pattern: string): boolean => {
  if (!pattern) return true;

  const letters = pattern.toLowerCase().split("");
  let idx = 0;

  for (const char of str.toLowerCase()) {
    if (char === letters[idx]) {
      idx++;
      if (idx === letters.length) return true;
    }
  }

  return false;
};
