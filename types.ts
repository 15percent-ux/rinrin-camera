
export interface Character {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  systemInstruction: string;
  greeting: string;
  themeColor: string;
  tags: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  SETTINGS = 'SETTINGS'
}
