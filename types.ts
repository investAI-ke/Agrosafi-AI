
export enum Role {
  User = 'user',
  AI = 'ai',
}

export interface Message {
  role: Role;
  content: string;
}

export interface ParsedInsight {
    title: string;
    content: string;
}

export interface ChartJsDataset {
    label: string;
    data: number[];
}

export interface ChartJsData {
  type: 'line' | 'bar';
  labels: string[];
  datasets: ChartJsDataset[];
}

export interface Coords {
    latitude: number;
    longitude: number;
}

export type LocationStatus = 'idle' | 'fetching' | 'success' | 'error';