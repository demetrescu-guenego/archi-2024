import { GPSCoord } from "./GPSCoord";

export interface Localisation {
  zipcode: string | number;
  gps: GPSCoord;
  title: string;
  url: string;
}
