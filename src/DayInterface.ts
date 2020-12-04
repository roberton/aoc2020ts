export type StarFunc = (input: string[]) => string;

export interface Day {
  id: string
  star1: StarFunc
  star2: StarFunc
}
