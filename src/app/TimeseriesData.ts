export interface SeriesElement {
  x: number;
  y: number;
}

export interface TimeseriesData {
  measure: string;
  data: Array<SeriesElement>;
}


