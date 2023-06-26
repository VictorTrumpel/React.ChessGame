import { FieldMatrixCellType, FigureKey } from "./types"

export class FieldMatrixCell {
  private model: FieldMatrixCellType

  constructor(figureKey: FigureKey | null, color: "black" | "white") {
    this.model = { figureKey, color }
  }

  getModel() {
    return this.model
  }
}
