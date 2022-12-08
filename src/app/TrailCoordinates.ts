// coordinates are in swiss CH1903+/LV95
export interface TrailCoordinates {
  x: number;
  y: number;
}

// maps url e.g. 

const adlisberg: TrailCoordinates = {
  x: 2686133.808,
  y: 1247191.276
}

const allmend: TrailCoordinates = {
  x: 1400000,
  y: 1500000
}

const antennentrail: TrailCoordinates = {
  x: 2679248,
  y: 1245891
}

const hoeckler: TrailCoordinates = {
  x: 2681006,
  y: 1243986
}


export const trails = new Map<string, TrailCoordinates>();
trails.set("adlisberg-trail-1", adlisberg);
trails.set("allmendtrail-1", allmend);
trails.set("antennentrail-1", antennentrail);
trails.set("hoecker-new-3", hoeckler);


