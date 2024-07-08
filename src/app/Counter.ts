export interface Counter {
  id: string;
  name: string;
  description: string;
  online: boolean;
  temperature: number;
  humidity: number;
  batteryLevel: number;
  batteryVoltage: number;
  stat: string;
  statId: number;
  swVersion: number;
  hwVersion: number;
  location: string;
  sumLast24h: number;
  sumToday: number;
  gateways: Gateway | Gateway[];
  timestampLastMsg: string;
  airtime: number;
  hidden: boolean;
}

export interface Gateway {
  eui: string;
  id: string;
  rssi: number;
  snr: number;
}
