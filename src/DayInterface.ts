type StarFunc = (input: string[]) => void;

export interface Day {
  id: string
  star1: StarFunc
  star2: StarFunc
}
