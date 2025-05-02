import { GPSCoord } from "./GPSCoord";

export interface Client {
  name: string;
  zip: string | number;
  commune?: {
    name: string;
    zip: string | number;
  };
  gps?: GPSCoord;
  type: string;
  years: number[];
}
