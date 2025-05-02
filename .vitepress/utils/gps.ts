import { csvParse } from "d3";
import { readFileSync } from "node:fs";
import { GPSCoord } from "../interfaces/GPSCoord";
import { toSlug } from "./slug";

const DEFAULT_GPS: GPSCoord = {
  latitude: 0,
  longitude: 0,
};

const map = new Map<string, GPSCoord>();

const __dirname = import.meta.dirname;

const init = () => {
  const csvRaw = readFileSync(
    __dirname + "/zipcode/base-officielle-codes-postaux.csv",
    { encoding: "utf-8" },
  );

  const csv = csvParse(csvRaw);

  for (const r of csv) {
    const geopoint = r._geopoint;
    const [latitude, longitude] = geopoint.split(",").map((s) => +s);
    map.set(r.code_postal + r.nom_de_la_commune, { latitude, longitude });
  }
};

init();

export const normalize = (mairie: string) => {
  return toSlug(mairie)
    .toUpperCase()
    .replaceAll(/[^A-Z]/g, " ");
};

export const getGPSCoordFromZipcode = (zipcode: string | number): GPSCoord => {
  const gps = map.get(zipcode.toString());
  return gps ?? DEFAULT_GPS;
};
