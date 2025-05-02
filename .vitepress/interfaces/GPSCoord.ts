export interface GPSCoordObject {
  latitude: number;
  longitude: number;
}

export type GPSCoordString = `${number}, ${number}`;

export type GPSCoord = GPSCoordObject | GPSCoordString;
