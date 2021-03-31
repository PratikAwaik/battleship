import React, { useContext } from "react";
import { GameContext } from "./GameContext";

export default function Board(props) {
  const { grid } = useContext(GameContext);

  return (
    <div className="board">
      {grid.map((square, index) => {
        return (
          <div
            key={index}
            id={index}
            className="board-square"
            onClick={(e) =>
              props.isComputer ? props.handleClick(e) : null
            }></div>
        );
      })}
    </div>
  );
}
