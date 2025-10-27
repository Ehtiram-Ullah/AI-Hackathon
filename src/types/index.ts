export interface PlayerStats {
  name: string;
  level: number;
  currentXP: number;
  maxXP: number;
  coins: number;
  playerHealth: number;
}

export interface MenuButton {
  icon: any;
  label: string;
  primary: boolean;
}