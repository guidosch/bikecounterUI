export interface Trail {
  readonly name: string,
  readonly description: string,
  readonly coordinates: TrailCoordinates
}

// coordinates are in swiss CH1903+/LV95
export interface TrailCoordinates {
  readonly x: number;
  readonly y: number;
}

// maps url e.g. 
const adlisbergCoord: TrailCoordinates = {
  x: 2686133.808,
  y: 1247191.276
}

const allmendCoord: TrailCoordinates = {
  x: 2681249,
  y: 1244764
}

const antennentrailCoord: TrailCoordinates = {
  x: 2679248,
  y: 1245891
}

const hoecklerCoord: TrailCoordinates = {
  x: 2681006,
  y: 1243986
}

const adlisberg: Trail = {
  name: "Adlisberg Trail",
  description: "Einfacher Trail, der am höchsten Punkt vom Adlisberg via Rest. Degenried runter zum Stöckentobel.",
  coordinates: adlisbergCoord
}

const allmend: Trail = {
  name: "Allmend Trail",
  description: "Einsteiger Trail, der sich gut für die ersten Versuche eignet.",
  coordinates: allmendCoord
}

const antennentrail: Trail = {
  name: "Antennen Trail",
  description: "Start beim Antennenmast auf dem Gipfel vom Uetliberg. 3Km Abfahrt...",
  coordinates: antennentrailCoord
}

const hoeckler: Trail = {
  name: "Höckler Trail",
  description: "Höcker Trail by Züritrails. Anspruchsvoller Trail mit einige Elementen für Fortgeschrittene.",
  coordinates: hoecklerCoord
}

export const trails = new Map<string, Trail>();
trails.set("adlisberg-trail-1", adlisberg);
trails.set("allmendtrail-1", allmend);
trails.set("antennentrail-1", antennentrail);
trails.set("hoeckler-new-3", hoeckler);


