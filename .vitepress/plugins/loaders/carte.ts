import { getGPSCoordFromZipcode, normalize } from "../../utils/gps";
import { createContentLoader } from "../utils/createContentLoader";

/** * carteLoad function
 * This function loads the content of the carte or search page.
 * It uses the createContentLoader function to load the content of the page.
 * It then filters the posts to only include those that have a client object.
 * It also adds the gps coordinates to the client object if they are not already present.
 * Finally, it returns the frontmatter of the page as a string.
 *
 * @param {string} id - The id of the page to load.
 * @returns {Promise<string | void>} - Returns a string of the frontmatter or void.
 */
export const carteLoad = async (id: string) => {
  const regex = /^.*\/(carte|search).md$/;
  const matches = id.match(regex);
  if (!matches) {
    return;
  }
  const name = matches[1];
  const layout = name === "carte" ? "map" : name;
  const title = name === "carte" ? "Carte" : "Recherche";
  // look at all the projects and generate the frontmatter.
  const posts = await createContentLoader(`realisations/*/*.md`).load();

  const filteredPosts = posts.map((post) => {
    if (typeof post.frontmatter.client !== "object") {
      console.log("post.frontmatter: ", post.frontmatter);
      throw new Error("client not formatted");
    }
    const client = post.frontmatter.client;
    const key = client.commune
      ? client.commune.zip + normalize(client.commune.name)
      : client.zip + normalize(client.name);
    client.gps = client.gps ?? getGPSCoordFromZipcode(key);
    return post;
  });

  const jsonString = JSON.stringify({
    title,
    layout,
    posts: filteredPosts,
  });

  return `---
${jsonString}
---
  `;
};
