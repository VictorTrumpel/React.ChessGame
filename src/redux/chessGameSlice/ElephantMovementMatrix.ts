import { IMovementMatrix } from "./IMovementMatrix"
import { FieldMatrix, ActiveCell } from "./types"

export class ElephantMovementMatrix implements IMovementMatrix {
  private _fieldMatrix: FieldMatrix
  private _activeCell: ActiveCell

  constructor(fieldMatrix: FieldMatrix, activeCell: ActiveCell) {
    this._fieldMatrix = fieldMatrix
    this._activeCell = activeCell
  }

  markPossibleCellsForMove() {
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx - 1, colIdx - 1])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx + 1, colIdx + 1])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx + 1, colIdx - 1])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx - 1, colIdx + 1])
  }

  markDiagonal(
    increment: ([rowIdx, colIdx]: [number, number]) => [number, number],
  ) {
    const { rowIdx, colIdx, figureKey } = this._activeCell

    let currRowIdx = rowIdx
    let currColIdx = colIdx

    while (this._fieldMatrix[currRowIdx][currColIdx] !== undefined) {
      ;[currRowIdx, currColIdx] = increment([currRowIdx, currColIdx])

      const hasCell = Boolean(this._fieldMatrix[currRowIdx]?.[currColIdx])

      if (!hasCell) return

      const hasFigure =
        this._fieldMatrix[currRowIdx][currColIdx].figureKey != null

      if (hasFigure) {
        const figureOnSide = this._fieldMatrix[currRowIdx][currColIdx].figureKey

        const hasEnemyOnSide = figureKey.includes("_b")
          ? !figureOnSide?.includes("_b")
          : figureOnSide?.includes("_b")

        if (hasEnemyOnSide)
          this._fieldMatrix[currRowIdx][currColIdx].possibleForMove = true

        return
      }

      this._fieldMatrix[currRowIdx][currColIdx].possibleForMove = true
    }
  }
}
