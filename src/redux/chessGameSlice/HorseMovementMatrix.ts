import { IMovementMatrix } from "./IMovementMatrix"
import { FieldMatrix, ActiveCell } from "./types"

export class HorseMovementMatrix implements IMovementMatrix {
  private _fieldMatrix: FieldMatrix
  private _activeCell: ActiveCell

  constructor(fieldMatrix: FieldMatrix, activeCell: ActiveCell) {
    this._fieldMatrix = fieldMatrix
    this._activeCell = activeCell
  }

  markPossibleCellsForMove() {
    this.markCell(([rowIdx, colIdx]) => [rowIdx - 2, colIdx - 1])
    this.markCell(([rowIdx, colIdx]) => [rowIdx - 2, colIdx + 1])
    this.markCell(([rowIdx, colIdx]) => [rowIdx - 1, colIdx - 2])
    this.markCell(([rowIdx, colIdx]) => [rowIdx + 1, colIdx - 2])
    this.markCell(([rowIdx, colIdx]) => [rowIdx - 2, colIdx - 1])
    this.markCell(([rowIdx, colIdx]) => [rowIdx - 1, colIdx + 2])
    this.markCell(([rowIdx, colIdx]) => [rowIdx + 1, colIdx + 2])
    this.markCell(([rowIdx, colIdx]) => [rowIdx + 2, colIdx - 1])
    this.markCell(([rowIdx, colIdx]) => [rowIdx + 2, colIdx + 1])
  }

  markCell(detect: ([rowIdx, colIdx]: [number, number]) => [number, number]) {
    const { rowIdx, colIdx, figureKey } = this._activeCell

    const [dRowIdx, dColIdx] = detect([rowIdx, colIdx])

    const hasCell = Boolean(this._fieldMatrix[dRowIdx]?.[dColIdx])

    if (!hasCell) return

    const hasFigure = this._fieldMatrix[dRowIdx][dColIdx].figureKey != null

    if (hasFigure) {
      const figureOnSide = this._fieldMatrix[dRowIdx][dColIdx].figureKey

      const hasEnemyOnSide = figureKey.includes("_b")
        ? !figureOnSide?.includes("_b")
        : figureOnSide?.includes("_b")

      if (hasEnemyOnSide)
        this._fieldMatrix[dRowIdx][dColIdx].possibleForMove = true

      return
    }

    this._fieldMatrix[dRowIdx][dColIdx].possibleForMove = true
  }
}
