interface Player {
  name: string;
  champion: string;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  gold: number;
  championIcon: string;
  spell1?: string;
  spell2?: string;
  items?: string[];
}
