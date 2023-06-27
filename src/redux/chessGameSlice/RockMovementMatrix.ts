import { ElephantMovementMatrix } from "./ElephantMovementMatrix"

export class RockMovementMatrix extends ElephantMovementMatrix {
  markPossibleCellsForMove() {
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx + 1, colIdx])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx - 1, colIdx])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx, colIdx + 1])
    this.markDiagonal(([rowIdx, colIdx]) => [rowIdx, colIdx - 1])
  }
}
