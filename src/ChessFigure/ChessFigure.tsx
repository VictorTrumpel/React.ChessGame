import React from "react"
import { FigureKey } from "../redux/chessGameSlice/types"
import e from "../shared/images/elephant.png"
import e_b from "../shared/images/elephant_b.png"
import h from "../shared/images/horse.png"
import h_b from "../shared/images/horse_b.png"
import k from "../shared/images/king.png"
import k_b from "../shared/images/king_b.png"
import p from "../shared/images/pawn.png"
import p_b from "../shared/images/pawn_b.png"
import q from "../shared/images/queen.png"
import q_b from "../shared/images/queen_b.png"
import r from "../shared/images/rook.png"
import r_b from "../shared/images/rook_b.png"

const figureImageMap: Record<FigureKey, string> = {
  e,
  e_b,
  h,
  h_b,
  k,
  k_b,
  p,
  p_b,
  q,
  q_b,
  r,
  r_b,
}

type ChessFigureProps = {
  figureKey: FigureKey | null
}

export const ChessFigure = ({ figureKey }: ChessFigureProps) => {
  if (figureKey == null) return <></>

  return <img src={figureImageMap[figureKey]} className="chess-figure" />
}
