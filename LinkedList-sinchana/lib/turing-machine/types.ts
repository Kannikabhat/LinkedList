// export interface TapeCell {
//   symbol: string;
//   index: number;
// }

// export interface VisualizationStep {
//   tape: TapeCell[];
//   headPosition: number;
//   currentState: string;
//   actionDescription: string;
//   highlights?: { index: number; color: string }[];
// }

// export type State =
//   | 'q_start'
//   | 'q_seek_next'
//   | 'q_hold_A'
//   | 'q_hold_B'
//   | 'q_hold_C'
//   | 'q_hold_D'
//   | 'q_hold_E'
//   | 'q_shift_left'
//   | 'q_place'
//   | 'q_done';

// export type Symbol = '>' | '#' | 'A' | 'B' | 'C' | 'D' | 'E' | '_' | '*';

// export type Direction = 'L' | 'R' | 'S';

// export interface Transition {
//   currentState: State;
//   readSymbol: Symbol;
//   nextState: State;
//   writeSymbol: Symbol;
//   direction: Direction;
// }


export type Symbol = 'A' | 'B' | 'C' | 'D' | 'E' | '#' | '>' | '_' | '*';
export type Direction = 'L' | 'R' | 'S';
export type State =
  | 'q_start'
  | 'q_seek_next'
  | 'q_done'
  | `q_hold_${string}`;

export interface TapeCell {
  symbol: Symbol;
  index: number;
}

export interface Transition {
  currentState: State;
  readSymbol: Symbol;
  writeSymbol: Symbol;
  moveDirection: Direction;
  nextState: State;
}

export interface VisualizationStep {
  tape: TapeCell[];
  headPosition: number;
  currentState: State;
  actionDescription: string;
  highlights?: { index: number; color: string }[];
  pseudoCodeLines?: number[];
}
