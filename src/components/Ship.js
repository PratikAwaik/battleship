import React, { useContext } from "react";
import { GameContext } from "./GameContext";

export default function Ship(props) {
  const { grid } = useContext(GameContext);
  const { shipsOrientation, setShipsOrientation } = useContext(GameContext);
  const { humanPlayer, setHumanPlayer } = useContext(GameContext);
  const { setAllShipsPlaced } = useContext(GameContext);

  const arr = [];
  for (let i = 0; i < props.shipLength; i++) {
    arr.push(i);
  }

  const handleDragEnd = (e) => {
    const dragEndElement = document.elementFromPoint(e.clientX, e.clientY);
    if (dragEndElement.getAttribute("class") === "board-square") {
      const position = grid[parseInt(dragEndElement.id)];
      const shipName = e.target.getAttribute("data-name");
      const shipLength = shipsOrientation[shipName].shipLength;
      const newHumanPlayer = Object.assign(
        Object.create(Object.getPrototypeOf(humanPlayer)),
        humanPlayer,
      );
      if (
        newHumanPlayer.board.isValidPosition(
          shipLength,
          position,
          shipsOrientation[shipName].isHorizontal,
        )
      ) {
        newHumanPlayer.board.placeShip(
          shipLength,
          position,
          shipsOrientation[shipName].isHorizontal,
        );

        for (let i = 0; i < shipLength; i++) {
          if (shipsOrientation[shipName].isHorizontal) {
            const boardSquare = document.getElementById(
              `${parseInt(dragEndElement.id) + i}`,
            );
            boardSquare.classList.add("ship-position");
          } else {
            const boardSquare = document.getElementById(
              `${parseInt(dragEndElement.id) + 10 * i}`,
            );
            boardSquare.classList.add("ship-position");
          }
        }
        e.target.style.display = "none";
        const ships = document.querySelector(".ships");

        if (newHumanPlayer.board.aliveShips.length === 5) {
          setAllShipsPlaced(true);
          ships.style.display = "none";
        }
        setHumanPlayer(newHumanPlayer);
      }
    }
  };

  const alterDirection = (e) => {
    const shipName = e.target.parentElement.getAttribute("data-name");
    const shipLength = shipsOrientation[shipName].shipLength;

    if (!shipsOrientation[shipName].isPlaced) {
      if (shipsOrientation[shipName].isHorizontal) {
        e.target.parentElement.style.height = `${5 * shipLength}rem`;
        e.target.parentElement.style.width = "5rem";
        e.target.parentElement.style.flexDirection = "column";
        const newShipsOrientation = JSON.parse(
          JSON.stringify(shipsOrientation),
        );
        newShipsOrientation[shipName].isHorizontal = false;
        setShipsOrientation(newShipsOrientation);
      } else {
        e.target.parentElement.style.width = `${5 * shipLength}rem`;
        e.target.parentElement.style.height = "5rem";
        e.target.parentElement.style.flexDirection = "row";
        const newShipsOrientation = JSON.parse(
          JSON.stringify(shipsOrientation),
        );
        newShipsOrientation[shipName].isHorizontal = true;
        setShipsOrientation(newShipsOrientation);
      }
    }
  };

  return (
    <div
      className={`ship-${props.index + 1} ship`}
      data-name={props.name}
      draggable="true"
      onDragEnd={(e) => handleDragEnd(e)}
      onClick={(e) => alterDirection(e)}>
      {arr.map((item, index) => {
        return <div key={index}></div>;
      })}
    </div>
  );
}
