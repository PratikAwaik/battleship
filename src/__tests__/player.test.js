import Player from "../gameLogic/player";

describe("Player Works", () => {
  const playerOne = new Player();
  const playerTwo = new Player();

  const orientation = {
    carrier: { shipLength: 5, isHorizontal: true },
    battleship: { shipLength: 4, isHorizontal: true },
    cruiser: { shipLength: 3, isHorizontal: true },
    submarine: { shipLength: 3, isHorizontal: true },
    destroyer: { shipLength: 2, isHorizontal: true },
  };

  playerOne.board.placeShipsRandomly(orientation);
  playerTwo.board.placeShipsRandomly(orientation);

  console.log(playerOne.board.filledShipPositions);
  console.log(playerTwo.board.filledShipPositions);

  test("Player can attack the enemy", () => {
    playerTwo.attackEnemy(playerOne, [0, 1]);
    playerTwo.attackEnemy(playerOne, [0, 2]);
    playerTwo.attackEnemy(playerOne, [0, 3]);
    playerTwo.attackEnemy(playerOne, [0, 4]);
    playerTwo.attackEnemy(playerOne, [0, 5]);
    expect(playerOne.board.aliveShips.length).toBe(4);
  });
});
