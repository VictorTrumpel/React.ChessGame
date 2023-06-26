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

        chessGameSlice.caseReducers.clearMarksOnPossibleMovementCells(state)

        return
      }

      // клик по той же самой клетке
      if (
        activeCell != null &&
        activeCell.rowIdx == rowIdx &&
        activeCell.colIdx == colIdx
      ) {
        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].active = false

        state.activeCell = null

        chessGameSlice.caseReducers.clearMarksOnPossibleMovementCells(state)

        return
      }

      if (activeCell != null && clickedFigureKey != null) {
        fieldMatrix[rowIdx][colIdx].figureKey = activeCell.figureKey

        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].figureKey = null
        fieldMatrix[activeCell.rowIdx][activeCell.colIdx].active = false

        state.activeCell = null

        chessGameSlice.caseReducers.clearMarksOnPossibleMovementCells(state)

        return
      }
    },

    markPossibleCellsForMove(state, payload: PayloadAction<ActiveCell>) {
      const { rowIdx, colIdx, figureKey } = payload.payload

      new PawnMovementMatrix(state.fieldMatrix, {
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
