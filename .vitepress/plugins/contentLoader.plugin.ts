import { carteLoad } from "./loaders/carte";
import { clientLoad } from "./loaders/client";
import { mairieLoad } from "./loaders/mairie";
import { realisationLoad } from "./loaders/realisation";

export const contentLoader = {
  name: "content-loader",
  async load(id: string) {
    return (
      (await realisationLoad(id)) ??
      (await clientLoad(id)) ??
      (await mairieLoad(id)) ??
      (await carteLoad(id))
    );
  },
};
