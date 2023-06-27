import { ElephantMovementMatrix } from "./ElephantMovementMatrix"

export class QueenMovementMatrix extends ElephantMovementMatrix {
  markPossibleCellsForMove() {
    super.markPossibleCellsForMove()

    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx + 1, colIdx])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx - 1, colIdx])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx, colIdx + 1])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx, colIdx - 1])
  }
}
