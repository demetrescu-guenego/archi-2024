import { GPSCoord } from "./GPSCoord";

export interface Localisation {
  zipcode: string;
  gps: GPSCoord;
  label: string;
  url: string;
}
