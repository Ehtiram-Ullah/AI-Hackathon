export interface PlayerStats {
  name: string;
  level: number;
  currentXP: number;
  maxXP: number;
  coins: number;
}

export interface MenuButton {
  icon: any;
  label: string;
  primary: boolean;
}