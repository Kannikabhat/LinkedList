

// import type {
//   TapeCell,
//   VisualizationStep,
//   State,
//   Symbol,
//   Direction,
//   Transition,
// } from './types';

// class TuringMachine {
//   private tape: Symbol[];
//   private headPosition: number;
//   private currentState: State;
//   private transitions: Transition[];
//   private steps: VisualizationStep[];
//   private heldSymbol: Symbol | null;
//   private sortedBoundary: number;
//   private unsortedIndex: number;

//   constructor(input: string[]) {
//     this.tape = this.initializeTape(input);
//     this.headPosition = 0;
//     this.currentState = 'q_start';
//     this.steps = [];
//     this.heldSymbol = null;
//     this.sortedBoundary = 0;
//     this.unsortedIndex = 0;
//     this.transitions = this.defineTransitions();
//     this.captureStep('Initialize machine');
//   }

//   private initializeTape(input: string[]): Symbol[] {
//     const tape: Symbol[] = ['>'];
//     for (const item of input) {
//       tape.push('#', item as Symbol);
//     }
//     tape.push('#');
//     for (let i = 0; i < 10; i++) {
//       tape.push('_');
//     }
//     return tape;
//   }

//   private defineTransitions(): Transition[] {
//     return [];
//   }

//   private captureStep(action: string, highlights?: { index: number; color: string }[]) {
//     const tapeCells: TapeCell[] = this.tape.map((symbol, index) => ({
//       symbol,
//       index,
//     }));

//     this.steps.push({
//       tape: tapeCells,
//       headPosition: this.headPosition,
//       currentState: this.currentState,
//       actionDescription: action,
//       highlights,
//     });
//   }

//   private readSymbol(): Symbol {
//     return this.tape[this.headPosition];
//   }

//   private writeSymbol(symbol: Symbol) {
//     this.tape[this.headPosition] = symbol;
//   }

//   private moveHead(direction: Direction) {
//     if (direction === 'L') {
//       this.headPosition = Math.max(0, this.headPosition - 1);
//     } else if (direction === 'R') {
//       this.headPosition = Math.min(this.tape.length - 1, this.headPosition + 1);
//     }
//   }

//   private isDataSymbol(symbol: Symbol): boolean {
//     return ['A', 'B', 'C', 'D', 'E'].includes(symbol);
//   }

//   private compareSymbols(a: Symbol, b: Symbol): number {
//     if (!this.isDataSymbol(a) || !this.isDataSymbol(b)) return 0;
//     return a.charCodeAt(0) - b.charCodeAt(0);
//   }

//   private getElementAtLogicalIndex(logicalIndex: number): { symbol: Symbol; tapeIndex: number } | null {
//     let elementCount = 0;
//     for (let i = 1; i < this.tape.length; i++) {
//       if (this.tape[i] === '#') {
//         const nextIdx = i + 1;
//         if (nextIdx < this.tape.length && (this.isDataSymbol(this.tape[nextIdx]) || this.tape[nextIdx] === '*')) {
//           if (elementCount === logicalIndex) {
//             return { symbol: this.tape[nextIdx], tapeIndex: nextIdx };
//           }
//           elementCount++;
//           i++;
//         }
//       }
//     }
//     return null;
//   }

//   private getLogicalArraySize(): number {
//     let count = 0;
//     for (let i = 1; i < this.tape.length; i++) {
//       if (this.tape[i] === '#') {
//         const nextIdx = i + 1;
//         if (nextIdx < this.tape.length && (this.isDataSymbol(this.tape[nextIdx]) || this.tape[nextIdx] === '*')) {
//           count++;
//           i++;
//         }
//       }
//     }
//     return count;
//   }

//   private findNextUnsorted(): boolean {
//     const arraySize = this.getLogicalArraySize();
//     if (this.sortedBoundary >= arraySize) {
//       return false;
//     }
//     this.unsortedIndex = this.sortedBoundary;
//     return true;
//   }

//   private findInsertionPosition(heldSymbol: Symbol): number {
//     let insertPos = 0;
//     for (let i = 0; i < this.sortedBoundary; i++) {
//       const elem = this.getElementAtLogicalIndex(i);
//       if (elem && this.isDataSymbol(elem.symbol)) {
//         if (this.compareSymbols(heldSymbol, elem.symbol) > 0) {
//           insertPos = i + 1;
//         } else {
//           break;
//         }
//       }
//     }
//     return insertPos;
//   }

//   private shiftAndPlace(heldSymbol: Symbol, insertPos: number) {
//     const elem = this.getElementAtLogicalIndex(this.unsortedIndex);
//     if (!elem) return;

//     const currentHeldPos = elem.tapeIndex;
//     this.headPosition = currentHeldPos;
//     this.captureStep(`Remove ${heldSymbol} from position ${this.unsortedIndex}`, [
//       { index: currentHeldPos, color: '#f59e0b' },
//     ]);

//     this.writeSymbol('*');

//     this.captureStep(`Shift elements between positions ${insertPos} and ${this.unsortedIndex}`, [
//       { index: currentHeldPos, color: '#f59e0b' },
//     ]);

//     let shiftedCount = 0;
//     for (let i = this.unsortedIndex; i > insertPos; i--) {
//       const source = this.getElementAtLogicalIndex(i - 1);
//       const dest = this.getElementAtLogicalIndex(i);
//       if (source && dest) {
//         this.headPosition = source.tapeIndex;
//         const sourceSymbol = this.tape[source.tapeIndex];
//         this.captureStep(`Shift ${sourceSymbol} right`, [
//           { index: source.tapeIndex, color: '#3b82f6' },
//           { index: dest.tapeIndex, color: '#3b82f6' },
//         ]);
//         this.headPosition = dest.tapeIndex;
//         this.writeSymbol(sourceSymbol);
//         this.captureStep(`Placed ${sourceSymbol} at position ${i}`, [
//           { index: dest.tapeIndex, color: '#3b82f6' },
//         ]);
//         shiftedCount++;
//       }
//     }

//     const insertTarget = this.getElementAtLogicalIndex(insertPos);
//     if (insertTarget) {
//       this.headPosition = insertTarget.tapeIndex;
//       this.writeSymbol(heldSymbol);
//       this.captureStep(`Place ${heldSymbol} at position ${insertPos}`, [
//         { index: insertTarget.tapeIndex, color: '#22c55e' },
//       ]);
//     }
//   }

//   public run(): VisualizationStep[] {
//     let maxSteps = 2000;
//     let stepCount = 0;

//     while (this.currentState !== 'q_done' && stepCount < maxSteps) {
//       stepCount++;

//       if (this.currentState === 'q_start') {
//         this.headPosition = 1;
//         this.currentState = 'q_seek_next';
//         this.captureStep('Start insertion sort');
//         continue;
//       }

//       if (this.currentState === 'q_seek_next') {
//         const found = this.findNextUnsorted();
//         if (!found) {
//           this.currentState = 'q_done';
//           this.headPosition = 1;
//           this.captureStep('Sorting complete - array is fully sorted');
//           continue;
//         }

//         const elem = this.getElementAtLogicalIndex(this.unsortedIndex);
//         if (elem && this.isDataSymbol(elem.symbol)) {
//           this.headPosition = elem.tapeIndex;
//           this.heldSymbol = elem.symbol;
//           this.writeSymbol('*');
//           this.currentState = `q_hold_${elem.symbol}` as State;
//           this.captureStep(`Hold ${elem.symbol} from position ${this.unsortedIndex}`, [
//             { index: elem.tapeIndex, color: '#3b82f6' },
//           ]);
//           continue;
//         }
//       }

//       if (this.currentState.startsWith('q_hold_')) {
//         if (this.heldSymbol) {
//           const insertPos = this.findInsertionPosition(this.heldSymbol);
//           this.captureStep(`Find insertion position: ${insertPos}`);
//           this.shiftAndPlace(this.heldSymbol, insertPos);
//           this.heldSymbol = null;
//           this.sortedBoundary++;
//           this.currentState = 'q_seek_next';
//           continue;
//         }
//       }
//     }

//     if (stepCount >= maxSteps) {
//       this.captureStep('Maximum steps reached - possible infinite loop');
//     }

//     return this.steps;
//   }

//   public getSteps(): VisualizationStep[] {
//     return this.steps;
//   }
// }

// export function generateSortingTMSteps(inputArray: string[]): VisualizationStep[] {
//   const tm = new TuringMachine(inputArray);
//   return tm.run();
// }




import type {
  TapeCell,
  VisualizationStep,
  State,
  Symbol,
  Direction,
  Transition,
} from './types';

class TuringMachine {
  private tape: Symbol[];
  private headPosition: number;
  private currentState: State;
  private transitions: Transition[];
  private steps: VisualizationStep[];
  private heldSymbol: Symbol | null;
  private sortedBoundary: number;
  private unsortedIndex: number;

  constructor(input: string[]) {
    this.tape = this.initializeTape(input);
    this.headPosition = 0;
    this.currentState = 'q_start';
    this.steps = [];
    this.heldSymbol = null;
    this.sortedBoundary = 0;
    this.unsortedIndex = 0;
    this.transitions = this.defineTransitions();
    this.captureStep('Initialize machine', undefined, [0]);
  }

  private initializeTape(input: string[]): Symbol[] {
    const tape: Symbol[] = ['>'];
    for (const item of input) {
      tape.push('#', item as Symbol);
    }
    tape.push('#');
    for (let i = 0; i < 10; i++) {
      tape.push('_');
    }
    return tape;
  }

  private defineTransitions(): Transition[] {
    return [];
  }

  private captureStep(
    action: string,
    highlights?: { index: number; color: string }[],
    pseudoCodeLines?: number[]
  ) {
    const tapeCells: TapeCell[] = this.tape.map((symbol, index) => ({
      symbol,
      index,
    }));

    this.steps.push({
      tape: tapeCells,
      headPosition: this.headPosition,
      currentState: this.currentState,
      actionDescription: action,
      highlights,
      pseudoCodeLines,
    });
  }

  private readSymbol(): Symbol {
    return this.tape[this.headPosition];
  }

  private writeSymbol(symbol: Symbol) {
    this.tape[this.headPosition] = symbol;
  }

  private moveHead(direction: Direction) {
    if (direction === 'L') {
      this.headPosition = Math.max(0, this.headPosition - 1);
    } else if (direction === 'R') {
      this.headPosition = Math.min(this.tape.length - 1, this.headPosition + 1);
    }
  }

  private isDataSymbol(symbol: Symbol): boolean {
    return ['A', 'B', 'C', 'D', 'E'].includes(symbol);
  }

  private compareSymbols(a: Symbol, b: Symbol): number {
    if (!this.isDataSymbol(a) || !this.isDataSymbol(b)) return 0;
    return a.charCodeAt(0) - b.charCodeAt(0);
  }

  private getElementAtLogicalIndex(logicalIndex: number): { symbol: Symbol; tapeIndex: number } | null {
    let elementCount = 0;
    for (let i = 1; i < this.tape.length; i++) {
      if (this.tape[i] === '#') {
        const nextIdx = i + 1;
        if (nextIdx < this.tape.length && (this.isDataSymbol(this.tape[nextIdx]) || this.tape[nextIdx] === '*')) {
          if (elementCount === logicalIndex) {
            return { symbol: this.tape[nextIdx], tapeIndex: nextIdx };
          }
          elementCount++;
          i++;
        }
      }
    }
    return null;
  }

  private getLogicalArraySize(): number {
    let count = 0;
    for (let i = 1; i < this.tape.length; i++) {
      if (this.tape[i] === '#') {
        const nextIdx = i + 1;
        if (nextIdx < this.tape.length && (this.isDataSymbol(this.tape[nextIdx]) || this.tape[nextIdx] === '*')) {
          count++;
          i++;
        }
      }
    }
    return count;
  }

  private findNextUnsorted(): boolean {
    const arraySize = this.getLogicalArraySize();
    if (this.sortedBoundary >= arraySize) {
      return false;
    }
    this.unsortedIndex = this.sortedBoundary;
    return true;
  }

  private findInsertionPosition(heldSymbol: Symbol): number {
    let insertPos = 0;
    for (let i = 0; i < this.sortedBoundary; i++) {
      const elem = this.getElementAtLogicalIndex(i);
      if (elem && this.isDataSymbol(elem.symbol)) {
        if (this.compareSymbols(heldSymbol, elem.symbol) > 0) {
          insertPos = i + 1;
        } else {
          break;
        }
      }
    }
    return insertPos;
  }

  private shiftAndPlace(heldSymbol: Symbol, insertPos: number) {
    const elem = this.getElementAtLogicalIndex(this.unsortedIndex);
    if (!elem) return;

    const currentHeldPos = elem.tapeIndex;
    this.headPosition = currentHeldPos;
    this.captureStep(
      `Remove ${heldSymbol} from position ${this.unsortedIndex}`,
      [{ index: currentHeldPos, color: '#f59e0b' }],
      [2]
    );

    this.writeSymbol('*');

    this.captureStep(
      `Shift elements between positions ${insertPos} and ${this.unsortedIndex}`,
      [{ index: currentHeldPos, color: '#f59e0b' }],
      [3, 4]
    );

    let shiftedCount = 0;
    for (let i = this.unsortedIndex; i > insertPos; i--) {
      const source = this.getElementAtLogicalIndex(i - 1);
      const dest = this.getElementAtLogicalIndex(i);
      if (source && dest) {
        this.headPosition = source.tapeIndex;
        const sourceSymbol = this.tape[source.tapeIndex];
        this.captureStep(
          `Shift ${sourceSymbol} right`,
          [
            { index: source.tapeIndex, color: '#3b82f6' },
            { index: dest.tapeIndex, color: '#3b82f6' },
          ],
          [4, 5]
        );
        this.headPosition = dest.tapeIndex;
        this.writeSymbol(sourceSymbol);
        this.captureStep(
          `Placed ${sourceSymbol} at position ${i}`,
          [{ index: dest.tapeIndex, color: '#3b82f6' }],
          [4]
        );
        shiftedCount++;
      }
    }

    const insertTarget = this.getElementAtLogicalIndex(insertPos);
    if (insertTarget) {
      this.headPosition = insertTarget.tapeIndex;
      this.writeSymbol(heldSymbol);
      this.captureStep(
        `Place ${heldSymbol} at position ${insertPos}`,
        [{ index: insertTarget.tapeIndex, color: '#22c55e' }],
        [6]
      );
    }
  }

  public run(): VisualizationStep[] {
    let maxSteps = 2000;
    let stepCount = 0;

    while (this.currentState !== 'q_done' && stepCount < maxSteps) {
      stepCount++;

      if (this.currentState === 'q_start') {
        this.headPosition = 1;
        this.currentState = 'q_seek_next';
        this.captureStep('Start insertion sort', undefined, [1]);
        continue;
      }

      if (this.currentState === 'q_seek_next') {
        const found = this.findNextUnsorted();
        if (!found) {
          this.currentState = 'q_done';
          this.headPosition = 1;
          this.captureStep('Sorting complete - array is fully sorted', undefined, [1]);
          continue;
        }

        const elem = this.getElementAtLogicalIndex(this.unsortedIndex);
        if (elem && this.isDataSymbol(elem.symbol)) {
          this.headPosition = elem.tapeIndex;
          this.heldSymbol = elem.symbol;
          this.writeSymbol('*');
          this.currentState = `q_hold_${elem.symbol}` as State;
          this.captureStep(
            `Hold ${elem.symbol} from position ${this.unsortedIndex}`,
            [{ index: elem.tapeIndex, color: '#3b82f6' }],
            [2]
          );
          continue;
        }
      }

      if (this.currentState.startsWith('q_hold_')) {
        if (this.heldSymbol) {
          const insertPos = this.findInsertionPosition(this.heldSymbol);
          this.captureStep(`Find insertion position: ${insertPos}`, undefined, [3]);
          this.shiftAndPlace(this.heldSymbol, insertPos);
          this.heldSymbol = null;
          this.sortedBoundary++;
          this.currentState = 'q_seek_next';
          continue;
        }
      }
    }

    if (stepCount >= maxSteps) {
      this.captureStep('Maximum steps reached - possible infinite loop');
    }

    return this.steps;
  }

  public getSteps(): VisualizationStep[] {
    return this.steps;
  }
}

export function generateSortingTMSteps(inputArray: string[]): VisualizationStep[] {
  const tm = new TuringMachine(inputArray);
  return tm.run();
}
