export const toSlug = (text: string) => {
  text = text.normalize("NFD");

  const result = text
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ ']/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();

  return result;
};
