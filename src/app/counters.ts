export interface Counter {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  battery: number;
  status: string;
  location: string;
  timestampLastMsg: string;
}

export const counters = [
  {
    id: 1,
    name: 'adlisberg',
    temperature: 3,
    humidity: 88,
    battery: 3.7,
    status: 'ok',
    location: 'Adlisberg',
    timestampLastMsg: '2021-12-25',
  },
  {
    id: 2,
    name: 'Uetliberg',
    temperature: 3,
    humidity: 88,
    battery: 3.7,
    status: 'ok',
    location: 'Adlisberg',
    timestampLastMsg: '2021-12-25',
  },
  {
    id: 3,
    name: 'Höckler 3 new',
    temperature: 3,
    humidity: 88,
    battery: 3.7,
    status: 'ok',
    location: 'Adlisberg',
    timestampLastMsg: '2021-12-25',
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
