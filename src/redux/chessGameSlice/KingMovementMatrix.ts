import { IMovementMatrix } from "./IMovementMatrix"
import { FieldMatrix, ActiveCell } from "./types"

export class KingMovementMatrix implements IMovementMatrix {
  private _fieldMatrix: FieldMatrix
  private _activeCell: ActiveCell

  constructor(fieldMatrix: FieldMatrix, activeCell: ActiveCell) {
    this._fieldMatrix = fieldMatrix
    this._activeCell = activeCell
  }

  markPossibleCellsForMove() {
    const { rowIdx, colIdx } = this._activeCell

    this.markCell(rowIdx, colIdx - 1)
    this.markCell(rowIdx, colIdx + 1)
    this.markCell(rowIdx - 1, colIdx)
    this.markCell(rowIdx + 1, colIdx)
    this.markCell(rowIdx + 1, colIdx + 1)
    this.markCell(rowIdx + 1, colIdx - 1)
    this.markCell(rowIdx - 1, colIdx - 1)
    this.markCell(rowIdx - 1, colIdx + 1)
  }

  markCell(rowIdx: number, colIdx: number) {
    const { figureKey } = this._activeCell

    const hasCell = Boolean(this._fieldMatrix[rowIdx]?.[colIdx])

    if (!hasCell) return

    const hasFigure = this._fieldMatrix[rowIdx][colIdx].figureKey != null

    if (hasFigure) {
      const figureOnSide = this._fieldMatrix[rowIdx][colIdx].figureKey

      const hasEnemyOnSide = figureKey.includes("_b")
        ? !figureOnSide?.includes("_b")
        : figureOnSide?.includes("_b")

      if (hasEnemyOnSide)
        this._fieldMatrix[rowIdx][colIdx].possibleForMove = true

      return
    }

    this._fieldMatrix[rowIdx][colIdx].possibleForMove = true
  }
}
