export const sort = (array: number[]): number[] => {
  const u = [...new Set(array)];
  return u.sort();
};
