import React, { useEffect } from "react"
import { FigureKey } from "../redux/chessGameSlice/types"
import { ChessFigure } from "../ChessFigure/ChessFigure"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { chessActions } from "../redux/chessGameSlice/chessGameSlice"
import cn from "classnames"
import "./ChessCell.css"

type ChessCellProps = {
  color: "black" | "white"
  rowIdx: number
  colIdx: number
}

export const ChessCell = ({ color, rowIdx, colIdx }: ChessCellProps) => {
  const dispatch = useAppDispatch()

  const active = useAppSelector(
    (state) => state.chessGame.fieldMatrix[rowIdx][colIdx].active,
  )

  const figureKey = useAppSelector(
    (state) => state.chessGame.fieldMatrix[rowIdx][colIdx].figureKey,
  )

  const possibleForMove = useAppSelector(
    (state) => state.chessGame.fieldMatrix[rowIdx][colIdx].possibleForMove,
  )

  const handleCellClick = () => {
    dispatch(chessActions.onCellClick({ colIdx, rowIdx }))
  }

  return (
    <div
      onClick={handleCellClick}
      className={cn("chess-cell", color, { active, possibleForMove })}
    >
      <ChessFigure figureKey={figureKey} />
    </div>
  )
}
