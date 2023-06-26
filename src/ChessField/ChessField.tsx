import React from "react"
import { ChessCell } from "../ChessCell/ChessCell"
import { useAppSelector } from "../redux/hooks"
import "./ChessField.css"

export const ChessField = () => {
  const fieldMatrix = useAppSelector((state) => state.chessGame.fieldMatrix)

  return (
    <div className="chess-field">
      {fieldMatrix.map((row, rowIdx) =>
        row.map(({ figureKey, color }, colIdx) => (
          <ChessCell
            key={`${rowIdx}-${colIdx}`}
            color={color}
            rowIdx={rowIdx}
            colIdx={colIdx}
          />
        )),
      )}
    </div>
  )
}
