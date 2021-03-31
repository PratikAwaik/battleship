import React, { useState, useEffect } from "react";
import { GameContext } from "./GameContext";
import { getIndex, positionFound } from "../utils";
import Board from "./Board";
import Ship from "./Ship";
import Player from "../gameLogic/player";

export default function Game() {
  const [grid, setGrid] = useState([]);
  const [humanPlayer, setHumanPlayer] = useState(null);
  const [computerPlayer, setComputerPlayer] = useState(null);
  const [allShipsPlaced, setAllShipsPlaced] = useState(false);
  const [winner, setWinner] = useState(null);
  const [humanPlayerTurn, setHumanPlayerTurn] = useState(null);
  const [startGameBtnClicked, setStartGameBtnClicked] = useState(false);
  const [shipsOrientation, setShipsOrientation] = useState({
    carrier: { shipLength: 5, isHorizontal: true },
    battleship: { shipLength: 4, isHorizontal: true },
    cruiser: { shipLength: 3, isHorizontal: true },
    submarine: { shipLength: 3, isHorizontal: true },
    destroyer: { shipLength: 2, isHorizontal: true },
  });

  const state = {
    grid,
    humanPlayer,
    setHumanPlayer,
    allShipsPlaced,
    setAllShipsPlaced,
    winner,
    setWinner,
    humanPlayerTurn,
    setHumanPlayerTurn,
    startGameBtnClicked,
    setStartGameBtnClicked,
    shipsOrientation,
    setShipsOrientation,
  };

  useEffect(() => {
    setHumanPlayer(new Player());
    setComputerPlayer(new Player());
    const newGrid = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        newGrid.push([j, i]);
      }
    }
    setGrid(newGrid);
  }, []);

  const handleClick = (e) => {
    // game loop
    const newHumanPlayer = Object.assign(
      Object.create(Object.getPrototypeOf(humanPlayer)),
      humanPlayer,
    );
    const newComputerPlayer = Object.assign(
      Object.create(Object.getPrototypeOf(computerPlayer)),
      computerPlayer,
    );
    newHumanPlayer.attackEnemy(newComputerPlayer, grid[e.target.id]);
    const div = document.createElement("div");
    console.log("Player Attacked");
    if (
      positionFound(
        newComputerPlayer.board.filledShipPositions,
        grid[e.target.id],
      )
    ) {
      div.classList.add("successful-attack");
    } else {
      div.classList.add("unsuccessful-attack");
    }
    e.target.appendChild(div);
    e.target.style.pointerEvents = "none";
    e.target.parentElement.style.zIndex = "-10";
    e.target.parentElement.style.opacity = "0.2";

    if (newComputerPlayer.board.allShipsSank()) {
      setWinner("human");
      setHumanPlayerTurn(null);
      e.target.parentElement.style.zIndex = "-10";
      e.target.parentElement.style.opacity = "0.2";

      setAllShipsPlaced(true);
      const startGameBtn = document.querySelector(".start-game-btn");
      startGameBtn.textContent = "Restart Game";
      return;
    } else {
      setHumanPlayerTurn(false);
    }

    // attack on player after 1.5s
    setTimeout(function () {
      const randomHitPosition = newHumanPlayer.board.getRandomPosition(
        false,
        true,
      );

      newComputerPlayer.attackEnemy(newHumanPlayer, randomHitPosition);
      console.log("Computer Attacked");
      const index = getIndex(grid, randomHitPosition);
      const boardSquare = document.querySelectorAll(
        `.player-board .board .board-square`,
      )[index];
      const div = document.createElement("div");
      if (
        positionFound(
          newHumanPlayer.board.filledShipPositions,
          randomHitPosition,
        )
      ) {
        div.classList.add("successful-attack");
      } else {
        div.classList.add("unsuccessful-attack");
      }
      boardSquare.appendChild(div);
      e.target.parentElement.style.zIndex = "10";
      e.target.parentElement.style.opacity = "1";

      if (newHumanPlayer.board.allShipsSank()) {
        setWinner("computer");
        setHumanPlayerTurn(null);
        e.target.parentElement.style.zIndex = "-10";
        e.target.parentElement.style.opacity = "0.2";

        setAllShipsPlaced(true);
        const startGameBtn = document.querySelector(".start-game-btn");
        startGameBtn.textContent = "Restart Game";
        return;
      } else {
        setHumanPlayerTurn(true);
      }

      setHumanPlayer(newHumanPlayer);
      setComputerPlayer(newComputerPlayer);
    }, 1500);
  };

  const placeRandom = (e) => {
    const newHumanPlayer = Object.assign(
      Object.create(Object.getPrototypeOf(humanPlayer)),
      humanPlayer,
    );

    newHumanPlayer.board.placeShipsRandomly(shipsOrientation);

    newHumanPlayer.board.filledShipPositions.forEach((position) => {
      const index = getIndex(grid, position);
      const boardSquare = document.querySelectorAll(
        ".player-board .board .board-square",
      )[index];
      boardSquare.classList.add("ship-position");
    });

    document.querySelector(".ships").style.display = "none";

    setHumanPlayer(newHumanPlayer);
    setAllShipsPlaced(true);
  };

  const startGame = (e) => {
    if (e.target.textContent === "Restart Game") {
      setHumanPlayer(new Player());
      setComputerPlayer(new Player());
      setStartGameBtnClicked(false);
      setAllShipsPlaced(false);
      setWinner(null);
      e.target.textContent = "Start Game";

      const ships = document.querySelector(".ships");
      ships.style.display = "block";
      ships.childNodes.forEach((ship) => (ship.style.display = "flex"));

      const playerBoardSquares = document.querySelectorAll(
        ".player-board .board .board-square",
      );

      playerBoardSquares.forEach((square) => {
        square.className = "board-square";
        if (square.childNodes.length > 0) {
          square.removeChild(square.childNodes[0]);
        }
      });
    } else {
      const newComputerPlayer = Object.assign(
        Object.create(Object.getPrototypeOf(computerPlayer)),
        computerPlayer,
      );

      newComputerPlayer.board.placeShipsRandomly(shipsOrientation);

      setComputerPlayer(newComputerPlayer);
      setStartGameBtnClicked(true);
      setHumanPlayerTurn(true);
      setAllShipsPlaced(false);
    }
  };

  return (
    <div className="game-container">
      <div className="game-instructions">
        <h2>Instructions</h2>
        <ul>
          <li>Click on the ship to rotate it.</li>
          <li>
            Drag the head of the block and drop it on the board to place it.
          </li>
          <li>
            Once all your ships are placed, click on the button to start the
            game.
          </li>
        </ul>
      </div>

      <div className="game-rules">
        <h2>Rules</h2>
        <ul>
          <li>You cannot place the ships adjacent to each other.</li>
          <li>The player who destroys all the enemy's ships wins.</li>
        </ul>
      </div>

      <button
        className="start-game-btn"
        onClick={(e) => startGame(e)}
        style={{ display: allShipsPlaced ? "block" : "none" }}>
        Start Game
      </button>

      {winner === "human" ? (
        <p className="winner-text">Game Over! You Win</p>
      ) : winner === "computer" ? (
        <p className="winner-text">Game Over! Computer Win</p>
      ) : null}

      <GameContext.Provider value={state}>
        <div className="board-container">
          <div className="player-board">
            <h3>Your Battlefield</h3>
            <Board isComputer={false} />
          </div>

          {!allShipsPlaced && !startGameBtnClicked ? (
            <button
              className="place-random-btn"
              onClick={(e) => placeRandom(e)}>
              Place Randomly
            </button>
          ) : null}

          <div className="ships">
            {Object.keys(shipsOrientation).map((shipName, index) => {
              return (
                <Ship
                  key={index}
                  index={index}
                  shipLength={shipsOrientation[shipName].shipLength}
                  name={shipName}
                  humanPlayer={humanPlayer}
                />
              );
            })}
          </div>

          {humanPlayerTurn === true ? (
            <p className="player-turn">Your Turn</p>
          ) : humanPlayerTurn === false ? (
            <p className="player-turn">Computer's Turn</p>
          ) : null}

          {startGameBtnClicked ? (
            <div className="computer-board">
              <h3>Computer's Battlefield</h3>
              <Board isComputer={true} handleClick={handleClick} />
            </div>
          ) : null}
        </div>
      </GameContext.Provider>
    </div>
  );
}
