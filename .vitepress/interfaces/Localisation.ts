import { GPSCoord } from "./GPSCoord";

export interface Localisation {
  zipcode: string | number;
  gps: GPSCoord;
  label: string;
  url: string;
}
