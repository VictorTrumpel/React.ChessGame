// e - слон
// h - лошадь
// k - король
// p - пешка
// q - королева
// r - ладья
// _b черная фигура, без префикса - белая

export type FigureKey =
  | "e"
  | "e_b"
  | "h"
  | "h_b"
  | "k"
  | "k_b"
  | "p"
  | "p_b"
  | "q"
  | "q_b"
  | "r"
  | "r_b"

export type FieldMatrixCellType = {
  figureKey: FigureKey | null
  color: "black" | "white"
  active: boolean
  possibleForMove: boolean
}

export type FieldMatrixRow = [
  FieldMatrixCellType,
  FieldMatrixCellType,
  FieldMatrixCellType,
  FieldMatrixCellType,
  FieldMatrixCellType,
  FieldMatrixCellType,
  FieldMatrixCellType,
  FieldMatrixCellType,
]

export type FieldMatrix = [
  FieldMatrixRow,
  FieldMatrixRow,
  FieldMatrixRow,
  FieldMatrixRow,
  FieldMatrixRow,
  FieldMatrixRow,
  FieldMatrixRow,
  FieldMatrixRow,
]

export type ActiveCell = {
  figureKey: FigureKey
  rowIdx: number
  colIdx: number
}

export type GameState = {
  fieldMatrix: FieldMatrix
  activeCell: ActiveCell | null
}
