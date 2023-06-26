import { GameState } from "./chessGameSlice/types"
import { combineReducers } from "@reduxjs/toolkit"
import { chessGameSlice } from "./chessGameSlice/chessGameSlice"

export const rootReducer = combineReducers<{
  chessGame: GameState
}>({
  chessGame: chessGameSlice.reducer,
})
