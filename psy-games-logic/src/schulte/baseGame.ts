import { ICell } from './cell';
import { generateArray } from './array.generator';

export class GameError extends Error {}

/** Schulte game */
export interface IGame {
  /** Ячейки таблицы Шульте */
  readonly cells: ICell[];

  /** 
   * Игрок делает ход
   * @returns true, если игрок попал в ячейку, false - если игрок не попал в ячейку
  */
  check: (cellIndex: number) => boolean;

  /**
   * @returns true, если игра закончена, false - игра не закончена или еще даже не начиналась
   */
  isFinished: () => boolean;

  /**
   * @returns true, если игра началась, false, если игра еще не запущена
   */
  isStarted: () => boolean;

  /** Начинает игру */
  start: () => void;

  /** Индекс текущей ячейки в игре */
  readonly currentIndex: number;

  /** Возвращает время начала игры или null, если игра еще не началась */
  readonly startTime: Date | null;

  /** Возвращает время окончания игры или null, если игра еще не началась */
  readonly endTime: Date | null;

  /** Длительность игры milliseconds */
  readonly duration: number;
}

export abstract class BaseGame implements IGame {
  /** набор ячеек таблицы Шульте, которые должен будет кликать Игрок */
  protected readonly _cells: ICell[];
  /** дата/время начала игры */
  protected _startTime: Date | null = null;
  /** дата/время окончания игры */
  protected _endTime: Date | null = null;
  /** Индекс текущей ячейки в игре. Если Игрок правильно кликнул следующую ячейку, индекс увеличивается на единицу */
  protected _currentIndex: number = 0;

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
    // игра заканчивается когда кликнута последняя ячейка
    return this._currentIndex === this._cells.length;
  }

  public start(): void {
    if (this.isStarted()) {
      throw new GameError('The game is already started');
    }
    this._startTime = new Date();
  }

  /**
   * Заканчивает игру
   */
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

  get currentIndex(): number {
    return this._currentIndex;
  }

  get duration(): number {
    if (this._startTime !== null && this._endTime !== null) {
      return this._endTime.getTime() - this._startTime.getTime();
    }
    if (this._startTime) {
      const currentDate = new Date();
      return currentDate.getTime() - this._startTime.getTime();
    }
    throw new Error('The game is not started');
  }

  get cells(): ICell[] {
    return this._cells;
  }

  public check(cellIndex: number): boolean {
    if (cellIndex === this._currentIndex) {
      // игрок попал в правильную ячейку
      this._currentIndex++; // будем ожидать попадания в следующую ячейку
      if(this.isFinished()) { // если игрок прошел последнюю ячейку
        this._finish(); // заканчиваем игру
      }
      return true;
    }
    return false;
  }
}
