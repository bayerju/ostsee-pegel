export interface WaterLevelData {
  station: string;
  timestamp: string;
  level: number;
  unit: string;
}

export interface ScrapedData {
  lastUpdated: string;
  stations: WaterLevelData[];
}
