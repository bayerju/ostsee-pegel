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

export interface ParsedData {
  lastUpdated: string;
  data: {
    location: string;
    min: number;
    max: number;
    time: string;
  }[];
}