export const getImageUrl = (url: string): string => {
  // url is in the form : realisations/eglises/courtry
  const [, category, name] = url.split("/");

  // photos/projects/chateaux/coupvray/thumbnail-coupvray.avif
  return `/photos/projects/${category}/${name}/thumbnail-${name}.avif`;
};
