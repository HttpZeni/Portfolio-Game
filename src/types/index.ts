export interface Game {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  tech: string[];
  screenshots: string[];
  accentColor?: string;
  itchLink?: string;
  year: number;
  genre?: string;
  platform?: string;
  status?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface ContactInfo {
  email: string;
  github: string;
  discord: string;
}

export interface Particle {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  opacity: number;
}