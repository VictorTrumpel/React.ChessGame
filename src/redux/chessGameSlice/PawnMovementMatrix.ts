import { FieldMatrix, ActiveCell } from "./types"
import { IMovementMatrix } from "./IMovementMatrix"

export class PawnMovementMatrix implements IMovementMatrix {
  private _fieldMatrix: FieldMatrix
  private _activeCell: ActiveCell

  constructor(fieldMatrix: FieldMatrix, activeCell: ActiveCell) {
    this._fieldMatrix = fieldMatrix
    this._activeCell = activeCell
  }

  markPossibleCellsForMove() {
    const { figureKey } = this._activeCell

    const isFigureWhite = !figureKey.includes("_b")

    if (isFigureWhite) this.markCellForWhite()
    else this.markCellForBlack()
  }

  markCellForWhite() {
    const { rowIdx, colIdx } = this._activeCell

    const hasCellsInForward = Boolean(this._fieldMatrix[rowIdx - 1])

    if (!hasCellsInForward) return

    const isForwardEmpty = Boolean(
      this._fieldMatrix[rowIdx - 1][colIdx].figureKey == null,
    )

    if (this._fieldMatrix[rowIdx - 1] && isForwardEmpty)
      this._fieldMatrix[rowIdx - 1][colIdx].possibleForMove = true

    const isPawnWasMoved = rowIdx !== 6
    const isFarForwardEmpty = Boolean(
      this._fieldMatrix[rowIdx - 2]?.[colIdx]?.figureKey == null,
    )

    if (
      this._fieldMatrix[rowIdx - 2] &&
      !isPawnWasMoved &&
      isFarForwardEmpty &&
      isForwardEmpty
    )
      this._fieldMatrix[rowIdx - 2][colIdx].possibleForMove = true

    const hasEnemyFromLeftCorner =
      this._fieldMatrix[rowIdx - 1][colIdx - 1]?.figureKey?.includes("_b")

    if (hasEnemyFromLeftCorner)
      this._fieldMatrix[rowIdx - 1][colIdx - 1].possibleForMove = true

    const hasEnemyFromRightCorner =
      this._fieldMatrix[rowIdx - 1][colIdx + 1]?.figureKey?.includes("_b")

    if (hasEnemyFromRightCorner)
      this._fieldMatrix[rowIdx - 1][colIdx + 1].possibleForMove = true
  }

  markCellForBlack() {
    const { rowIdx, colIdx } = this._activeCell

    const hasCellsInForward = Boolean(this._fieldMatrix[rowIdx + 1])

    if (!hasCellsInForward) return

    const isForwardEmpty = Boolean(
      this._fieldMatrix[rowIdx + 1]?.[colIdx]?.figureKey == null,
    )

    if (this._fieldMatrix[rowIdx + 1] && isForwardEmpty)
      this._fieldMatrix[rowIdx + 1][colIdx].possibleForMove = true

    const isPawnWasMoved = rowIdx !== 1
    const isFarForwardEmpty = Boolean(
      this._fieldMatrix[rowIdx + 2]?.[colIdx]?.figureKey == null,
    )

    if (
      this._fieldMatrix[rowIdx + 2] &&
      !isPawnWasMoved &&
      isFarForwardEmpty &&
      isForwardEmpty
    )
      this._fieldMatrix[rowIdx + 2][colIdx].possibleForMove = true

    const hasEnemyFromLeftCorner =
      this._fieldMatrix[rowIdx + 1][colIdx - 1]?.figureKey?.length === 1

    if (hasEnemyFromLeftCorner)
      this._fieldMatrix[rowIdx + 1][colIdx - 1].possibleForMove = true

    const hasEnemyFromRightCorner =
      this._fieldMatrix[rowIdx + 1][colIdx + 1]?.figureKey?.length === 1

    if (hasEnemyFromRightCorner)
      this._fieldMatrix[rowIdx + 1][colIdx + 1].possibleForMove = true
  }
}
