export const getImageUrl = (url: string): string => {
  // realisations/eglises/courtry
  console.log("url: ", url);
  const [, category, name] = url.split("/");

  // photos/projects/chateaux/coupvray/thumbnail-coupvray.avif
  return `/photos/projects/${category}/${name}/thumbnail-${name}.avif`;
};
