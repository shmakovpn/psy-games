import { CellColor } from './cell.color';

/**
 * Ячейка в таблице Шульте
 */
export interface ICell {
  /**
   * Порядковый номер ячейки
   */
  index: number;
  /**
   * Текст отображаемый в ячейке
   */
  caption: string;
  /**
   * Текущий цвет ячейки
   */
  color: CellColor;
}
