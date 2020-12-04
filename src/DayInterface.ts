type StarFunc = (input: string[]) => void;

export interface Day {
  star1: StarFunc
  star2: StarFunc
}
