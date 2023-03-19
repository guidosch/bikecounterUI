export interface Counter {
  id: string;
  name: string;
  description: string;
  online: boolean;
  temperature: number;
  humidity: number;
  batteryLevel: number;
  batteryVoltage: number;
  status: number;
  swVersion: number;
  hwVersion: number;
  location: string;
  sumLast24h: number;
  sumToday: number;
  gateways: Gateway;
  timestampLastMsg: string;
}

export interface Gateway {
  eui: string;
  gateway_id:string;
}
