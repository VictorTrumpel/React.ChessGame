import { HorseMovementMatrix } from "./HorseMovementMatrix"
import { RockMovementMatrix } from "./RockMovementMatrix"
import { QueenMovementMatrix } from "./QueenMovementMatrix"
import { ElephantMovementMatrix } from "./ElephantMovementMatrix"
import { KingMovementMatrix } from "./KingMovementMatrix"
import { ActiveCell } from "./types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialGameState } from "./initialGameState"
import { PawnMovementMatrix } from "./PawnMovementMatrix"

export const chessGameSlice = createSlice({
  name: "chessGameSlice",
  initialState: initialGameState,
  reducers: {
    onCellClick: (
      state,
      payload: PayloadAction<{ rowIdx: number; colIdx: number }>,
    ) => {
      const { rowIdx, colIdx } = payload.payload

      const { fieldMatrix, activeCell } = state

      const clickedFigureKey = fieldMatrix[rowIdx][colIdx].figureKey

      if (activeCell == null && clickedFigureKey !== null) {
        if (state.isWhiteSideActive && clickedFigureKey.includes("_b")) return
        if (!state.isWhiteSideActive && !clickedFigureKey.includes("_b")) return
      }

      if (clickedFigureKey != null) {
        chessGameSlice.caseReducers.markPossibleCellsForMove(state, {
          payload: { colIdx, rowIdx, figureKey: clickedFigureKey },
          type: "",
        })
      }

      if (activeCell == null && clickedFigureKey != null) {
        const newActiveCell = {
          rowIdx,
          colIdx,
          figureKey: clickedFigureKey,
        }

        state.activeCell = newActiveCell

        fieldMatrix[rowIdx][colIdx].active = true

        return
      }

      if (
        activeCell != null &&
        fieldMatrix[rowIdx][colIdx].possibleForMove === false
      ) {
        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].active = false

        state.activeCell = null

        chessGameSlice.caseReducers.clearMarksOnPossibleMovementCells(state)

        return
      }

      if (activeCell != null && clickedFigureKey == null) {
        fieldMatrix[rowIdx][colIdx].figureKey = activeCell.figureKey

        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].figureKey = null
        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].active = false

        state.activeCell = null
        state.isWhiteSideActive = !state.isWhiteSideActive

        chessGameSlice.caseReducers.clearMarksOnPossibleMovementCells(state)

        return
      }

      // клик по той же самой клетке
      if (
        activeCell != null &&
        activeCell.rowIdx === rowIdx &&
        activeCell.colIdx === colIdx
      ) {
        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].active = false

        state.activeCell = null
        state.isWhiteSideActive = !state.isWhiteSideActive

        chessGameSlice.caseReducers.clearMarksOnPossibleMovementCells(state)

        return
      }

      if (activeCell != null && clickedFigureKey != null) {
        fieldMatrix[rowIdx][colIdx].figureKey = activeCell.figureKey

        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].figureKey = null
        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].active = false

        state.activeCell = null
        state.isWhiteSideActive = !state.isWhiteSideActive

        chessGameSlice.caseReducers.clearMarksOnPossibleMovementCells(state)

        return
      }
    },

    markPossibleCellsForMove(state, payload: PayloadAction<ActiveCell>) {
      const { rowIdx, colIdx, figureKey } = payload.payload

      if (figureKey === "p" || figureKey === "p_b")
        new PawnMovementMatrix(state.fieldMatrix, {
          rowIdx,
          colIdx,
          figureKey,
        }).markPossibleCellsForMove()

      if (figureKey === "k" || figureKey === "k_b")
        new KingMovementMatrix(state.fieldMatrix, {
          rowIdx,
          colIdx,
          figureKey,
        }).markPossibleCellsForMove()

      if (figureKey === "e" || figureKey === "e_b")
        new ElephantMovementMatrix(state.fieldMatrix, {
          rowIdx,
          colIdx,
          figureKey,
        }).markPossibleCellsForMove()

      if (figureKey === "q" || figureKey === "q_b")
        new QueenMovementMatrix(state.fieldMatrix, {
          rowIdx,
          colIdx,
          figureKey,
        }).markPossibleCellsForMove()

      if (figureKey === "r" || figureKey === "r_b")
        new RockMovementMatrix(state.fieldMatrix, {
          rowIdx,
          colIdx,
          figureKey,
        }).markPossibleCellsForMove()

      if (figureKey === "h" || figureKey === "h_b")
        new HorseMovementMatrix(state.fieldMatrix, {
          rowIdx,
          colIdx,
          figureKey,
        }).markPossibleCellsForMove()
    },

    clearMarksOnPossibleMovementCells(state) {
      state.fieldMatrix.forEach((row) =>
        row.forEach((cell) => (cell.possibleForMove = false)),
      )
    },
  },
})

export const chessActions = chessGameSlice.actions
