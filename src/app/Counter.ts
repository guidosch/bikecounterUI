export interface Counter {
  id: string;
  online: boolean;
  temperature: number;
  humidity: number;
  battery: number;
  status: number;
  location: string;
  sumLast24h: number;
  sumToday: number;
  gateways: string;
  timestampLastMsg: string;
}
