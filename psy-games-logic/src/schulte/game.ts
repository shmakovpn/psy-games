import { ICell } from './cell';
import { generateArray } from './array.generator';

export class GameError extends Error {}

/** Schulte game */
export interface IGame {
  /** cells getter */
  readonly cells: ICell[];
  /** Process check the cell of schulte table by user */
  check: (cellIndex: number) => boolean;
  /** Finds the cell of the schulte table by the its index */
  find: (cellIndex: number) => ICell;
  /** True if the game is finished */
  isFinished: () => boolean;
  /** True if the game is started */
  isStarted: () => boolean;
  /** Starts the game */
  start: () => void;
  /** start date getter */
  readonly startTime: Date | null;
  /** end date getter */
  readonly endTime: Date | null;
  /** duration getter */
  readonly duration: number | null;
}

abstract class Game {
  protected readonly _cells: ICell[];
  protected _startTime: Date | null = null;
  protected _endTime: Date | null = null;

  abstract createCell(cellIndex: number): ICell;

  constructor(size: number) {
    const array: number[] = generateArray(size);
    const cells: ICell[] = [];
    array.forEach((cellIndex) => cells.push(this.createCell(cellIndex)));
    this._cells = cells;
  }

  public isStarted(): boolean {
    return !!this._startTime;
  }

  public isFinished(): boolean {
    return !!this._endTime;
  }

  public start(): void {
    if (this.isStarted()) {
      throw new GameError('The game is already started');
    }
    this._startTime = new Date();
  }

  protected _finish(): void {
    if (this.isFinished()) {
      throw new GameError('The game is already finished');
    }
    if (!this.isStarted()) {
      throw new Error('The game is not started');
    }
    this._endTime = new Date();
  }

  get startTime(): Date | null {
    return this._startTime;
  }

  get endTime(): Date | null {
    return this._endTime;
  }

  // get duration(): number | null {
  //   // if(!this._startTime)
  // }
}
