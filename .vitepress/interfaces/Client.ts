import { GPSCoord } from "./GPSCoord";

export interface Client {
  name: string;
  zip: string;
  gps?: GPSCoord;
  type: string;
  years: number[];
}
