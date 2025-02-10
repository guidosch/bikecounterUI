export interface Trail {
  readonly name: string,
  readonly description: string,
  readonly coordinates: TrailCoordinates,
  readonly hidden: boolean
}

// coordinates are in swiss CH1903+/LV95
export interface TrailCoordinates {
  readonly x: number;
  readonly y: number;
}

// maps url e.g. 
const adlisbergCoord: TrailCoordinates = {
  x: 2681175,
  y: 1244727
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

const gratwegCoord: TrailCoordinates = {
  x: 2680196,
  y: 1243773
}

const chirchhofCoord: TrailCoordinates = {
  x: 2679125,
  y: 1245055
}

const zoBikeTrail1Coord: TrailCoordinates = {
  x: 2679125,
  y: 1245055
}

const jumplineHoecklerCoord: TrailCoordinates = {
  x: 2680943,
  y: 1244077
}

const adlisberg: Trail = {
  name: "Adlisberg Trail",
  description: "Einfacher Trail, der am höchsten Punkt vom Adlisberg via Rest. Degenried runter zum Stöckentobel.",
  coordinates: adlisbergCoord,
  hidden: false

}

const allmend: Trail = {
  name: "Allmend Trail",
  description: "Einsteiger Trail, der sich gut für die ersten Versuche eignet.",
  coordinates: allmendCoord,
  hidden: false
}

const antennentrail: Trail = {
  name: "Antennen Trail",
  description: "Start beim Antennenmast auf dem Gipfel vom Uetliberg. 3Km Abfahrt...",
  coordinates: antennentrailCoord,
  hidden: false
}

const hoeckler: Trail = {
  name: "Höckler Trail",
  description: "Höcker Trail by Züritrails. Anspruchsvoller Trail mit einigen Elementen für Fortgeschrittene.",
  coordinates: hoecklerCoord,
  hidden: false
}

const gratweg: Trail = {
  name: "Gratweg Connector",
  description: "Verbindungs Trail zwischen Kulm und Höckler. In beide Richtungen fahrbar.",
  coordinates: gratwegCoord,
  hidden: false
}

const chirchhofridge: Trail = {
  name: "Chirchhof Ridge Trail",
  description: "Nicht offizieller Trail, der beim Spielplatz SZU Endstation startet und runter bis Stallikon führt.",
  coordinates: chirchhofCoord,
  hidden: true //not visible to users!
}

const zoBikeTrail1: Trail = {
  name: "ZO Bike Trail 1",
  description: "Noch nicht klar wo montiert.",
  coordinates: zoBikeTrail1Coord,
  hidden: false
}

const jumplineHoeckler: Trail = {
  name: "Höckler Jumpline",
  description: "Jupline am Ende vom Höckler Trail.",
  coordinates: jumplineHoecklerCoord,
  hidden: true //not visible to users!
}

export const trails = new Map<string, Trail>();
trails.set("adlisberg-trail-1", adlisberg);
trails.set("allmendtrail-1", allmend);
trails.set("antennentrail-1", antennentrail);
trails.set("hoeckler-new-3", hoeckler);
trails.set("gratweg-1", gratweg);
trails.set("chirchhof-ridge", chirchhofridge);
trails.set("zo-biketrail-1", zoBikeTrail1);
trails.set("jumpline", jumplineHoeckler);





