import { GPSCoord, GPSCoordObject } from "../interfaces/GPSCoord";

export const normalizeGPS = (gps: GPSCoord): GPSCoordObject => {
  if (typeof gps === "object") {
    return gps;
  }
  if (typeof gps === "string") {
    const [latitude, longitude] = gps.split(",").map((s) => +s);
    return {
      latitude,
      longitude,
    };
  }
  throw new Error("gps now well formatted", gps);
};
