import { GameState, FieldMatrixRow } from "./types"
import { FieldMatrixCell } from "./FieldMatrixCell"

const BlackPawnRow = Array.from({ length: 8 }).map((_, idx) => ({
  figureKey: "p_b",
  color: idx % 2 == 0 ? "black" : "white",
  active: false,
  possibleForMove: false,
})) as FieldMatrixRow

const WhitePawnRow = Array.from({ length: 8 }).map((_, idx) => ({
  figureKey: "p",
  color: idx % 2 ? "black" : "white",
  active: false,
  possibleForMove: false,
})) as FieldMatrixRow

const EmptyRow = (firstCellColor: "white" | "black") => {
  const secondCellColor = firstCellColor == "white" ? "black" : "white"

  return Array.from({ length: 8 }).map((_, idx) => ({
    figureKey: null,
    color: idx % 2 ? firstCellColor : secondCellColor,
    active: false,
    possibleForMove: false,
  })) as FieldMatrixRow
}

export const initialGameState: GameState = {
  fieldMatrix: [
    [
      {
        figureKey: "r_b",
        color: "white",
        active: false,
        possibleForMove: false,
      },
      {
        figureKey: "h_b",
        color: "black",
        active: false,
        possibleForMove: false,
      },
      {
        figureKey: "e_b",
        color: "white",
        active: false,
        possibleForMove: false,
      },
      {
        figureKey: "q_b",
        color: "black",
        active: false,
        possibleForMove: false,
      },
      {
        figureKey: "k_b",
        color: "white",
        active: false,
        possibleForMove: false,
      },
      {
        figureKey: "e_b",
        color: "black",
        active: false,
        possibleForMove: false,
      },
      {
        figureKey: "h_b",
        color: "white",
        active: false,
        possibleForMove: false,
      },
      {
        figureKey: "r_b",
        color: "black",
        active: false,
        possibleForMove: false,
      },
    ],
    BlackPawnRow,
    EmptyRow("black"),
    EmptyRow("white"),
    EmptyRow("black"),
    EmptyRow("white"),
    WhitePawnRow,
    [
      { figureKey: "r", color: "black", active: false, possibleForMove: false },
      { figureKey: "h", color: "white", active: false, possibleForMove: false },
      { figureKey: "e", color: "black", active: false, possibleForMove: false },
      { figureKey: "q", color: "white", active: false, possibleForMove: false },
      { figureKey: "k", color: "black", active: false, possibleForMove: false },
      { figureKey: "e", color: "white", active: false, possibleForMove: false },
      { figureKey: "h", color: "black", active: false, possibleForMove: false },
      { figureKey: "r", color: "white", active: false, possibleForMove: false },
    ],
  ],
  activeCell: null,
}
