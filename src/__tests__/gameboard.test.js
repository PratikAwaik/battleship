import Gameboard from "../gameLogic/gameboard";

describe("Gameboard Works", () => {
  const gameboard = new Gameboard(10);
  test("Can place a horizontal ship of Length 5", () => {
    if (gameboard.isValidPosition(5, [5, 5], true)) {
      gameboard.placeShip(5, [5, 5], true);
    }
    expect(gameboard.aliveShips.length).toBe(1);
  });

  test("Can place a horizontal ship on the edges", () => {
    if (gameboard.isValidPosition(4, [0, 0], true)) {
      gameboard.placeShip(4, [0, 0], true);
    }
    expect(gameboard.aliveShips.length).toBe(2);
  });

  test("Can place vertical ship on the edges", () => {
    if (gameboard.isValidPosition(4, [9, 0], false)) {
      gameboard.placeShip(4, [9, 0], false);
    }
    expect(gameboard.aliveShips.length).toBe(3);
  });

  test("Cannot place Ships out of bounds", () => {
    if (gameboard.isValidPosition(2, [9, 9], true)) {
      gameboard.placeShip(2, [9, 9], true);
    }
    expect(gameboard.aliveShips.length).toBe(3);
  });

  test("Cannot place Ship onto one another", () => {
    if (gameboard.isValidPosition(4, [0, 0], false)) {
      gameboard.placeShip(4, [0, 0], false);
    }
    expect(gameboard.aliveShips.length).toBe(3);
  });

  test("Cannot place Ships adjacent to other ships (1)", () => {
    if (gameboard.isValidPosition(3, [0, 1], false)) {
      gameboard.placeShip(3, [0, 1], false);
    }
    expect(gameboard.aliveShips.length).toBe(3);
  });

  test("Cannot place Ships adjacent to other ships (2)", () => {
    if (gameboard.isValidPosition(4, [5, 4], true)) {
      gameboard.placeShip(4, [5, 4], true);
    }
    expect(gameboard.aliveShips.length).toBe(3);
  });

  test("Receive attack works", () => {
    if (gameboard.isValidPosition(2, [1, 7], true)) {
      gameboard.placeShip(2, [1, 7], true);
    }
    expect(gameboard.aliveShips.length).toBe(4);
    gameboard.receiveAttack([1, 7]);
    gameboard.receiveAttack([2, 7]);
    expect(gameboard.aliveShips.length).toBe(3);
  });
});
