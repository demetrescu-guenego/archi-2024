import { GPSCoord } from "../interfaces/GPSCoord";

export const getGPSCoordFromZipcode = (zipcode: string): GPSCoord => {
  console.log("zipcode: ", zipcode);
  return {
    latitude: 0,
    longitude: 0,
  };
};
