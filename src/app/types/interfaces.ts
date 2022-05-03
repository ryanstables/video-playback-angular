export interface SeekableItem {
  image: string;
  timestamp: number;
  show: boolean;
}

export interface KeyFrame extends SeekableItem{
  position: number;
}
