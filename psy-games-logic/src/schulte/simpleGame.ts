import { BaseGame } from './baseGame';
import { ICell } from './cell';
import { CellColor } from './cell.color';

/** Простая игра Шульте */
export class SimpleGame extends BaseGame {
  createCell(cellIndex: number): ICell {
    return {
      index: cellIndex,
      caption: cellIndex.toString(),
      color: CellColor.normal,
    };
  }
}
