import { GPSCoordObject } from "./GPSCoord";

export interface Localisation {
  zipcode: string | number;
  gps: GPSCoordObject;
  title: string;
  url: string;
}
