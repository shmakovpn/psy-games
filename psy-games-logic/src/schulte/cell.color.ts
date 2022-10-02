/**
 * Цвет ячейки в таблице Шульте
 */
export enum ICellColor {
  /**
   * Не пройденная ячейка, выбираемая по возрастанию
   */
  normal,
  /**
   * Не пройденная ячейка, выбираемая про убыванию
   */
  reverse,
  /**
   * Пройденная ячейка, выбираемая по возрастанию
   */
  normalSelected,
  /**
   * Пройденная ячейка, выбираемая по убыванию
   */
  reverseSelected,
}