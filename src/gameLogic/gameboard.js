import { positionFound, getIndex } from "../utils";
import Ship from "./ship";

export default class Gameboard {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.filledShipPositions = [];
    this.availableShipPositions = [];
    this.availableAttackPositions = [];
    this.aliveShips = [];

    this.setAvailableShipPositions = this.setAvailableShipPositions.bind(this);
    this.getAdjacentPositionsHorizontal = this.getAdjacentPositionsHorizontal.bind(
      this,
    );
    this.getAdjacentPositionsVertical = this.getAdjacentPositionsVertical.bind(
      this,
    );

    this.getRandomPosition = this.getRandomPosition.bind(this);
    this.placeShip = this.placeShip.bind(this);
    this.receiveAttack = this.receiveAttack.bind(this);
    this.allShipsSank = this.allShipsSank.bind(this);
    this.isValidPosition = this.isValidPosition.bind(this);

    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        this.availableAttackPositions.push([j, i]);
        this.availableShipPositions.push([j, i]);
      }
    }
  }

  setAvailableShipPositions() {
    const availableShipPositions = JSON.parse(
      JSON.stringify(this.availableShipPositions),
    );

    for (let position of availableShipPositions) {
      if (positionFound(this.filledShipPositions, position))
        this.availableShipPositions.splice(
          getIndex(this.availableShipPositions, position),
          1,
        );
    }
  }

  getAdjacentPositionsHorizontal(shipLength, placePosition) {
    const adjacentPositionsHorizontal = [];
    for (let i = 0; i < shipLength; i++) {
      if (i === 0) {
        adjacentPositionsHorizontal.push([
          placePosition[0] - 1,
          placePosition[1],
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0],
          placePosition[1] + 1,
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0],
          placePosition[1] - 1,
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0] - 1,
          placePosition[1] + 1,
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0] - 1,
          placePosition[1] - 1,
        ]);
      } else if (i === shipLength - 1) {
        adjacentPositionsHorizontal.push([
          placePosition[0] + shipLength,
          placePosition[1],
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0] + shipLength - 1,
          placePosition[1] + 1,
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0] + shipLength - 1,
          placePosition[1] - 1,
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0] + shipLength,
          placePosition[1] + 1,
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0] + shipLength,
          placePosition[1] - 1,
        ]);
      } else {
        adjacentPositionsHorizontal.push([
          placePosition[0] + i,
          placePosition[1] + 1,
        ]);
        adjacentPositionsHorizontal.push([
          placePosition[0] + i,
          placePosition[1] - 1,
        ]);
      }
    }
    return adjacentPositionsHorizontal;
  }

  getAdjacentPositionsVertical(shipLength, placePosition) {
    const adjacentPositionsVertical = [];
    for (let i = 0; i < shipLength; i++) {
      if (i === 0) {
        adjacentPositionsVertical.push([
          placePosition[0] - 1,
          placePosition[1],
        ]);
        adjacentPositionsVertical.push([
          placePosition[0] + 1,
          placePosition[1],
        ]);
        adjacentPositionsVertical.push([
          placePosition[0],
          placePosition[1] - 1,
        ]);
        adjacentPositionsVertical.push([
          placePosition[0] - 1,
          placePosition[1] - 1,
        ]);
        adjacentPositionsVertical.push([
          placePosition[0] + 1,
          placePosition[1] - 1,
        ]);
      } else if (i === shipLength - 1) {
        adjacentPositionsVertical.push([
          placePosition[0] - 1,
          placePosition[1] + shipLength - 1,
        ]);
        adjacentPositionsVertical.push([
          placePosition[0] + 1,
          placePosition[1] + shipLength - 1,
        ]);
        adjacentPositionsVertical.push([
          placePosition[0],
          placePosition[1] + shipLength,
        ]);
        adjacentPositionsVertical.push([
          placePosition[0] + 1,
          placePosition[1] + shipLength,
        ]);
        adjacentPositionsVertical.push([
          placePosition[0] - 1,
          placePosition[1] + shipLength,
        ]);
      } else {
        adjacentPositionsVertical.push([
          placePosition[0] - 1,
          placePosition[1] + i,
        ]);
        adjacentPositionsVertical.push([
          placePosition[0] + 1,
          placePosition[1] + i,
        ]);
      }
    }

    return adjacentPositionsVertical;
  }

  isValidPosition(shipLength, placePosition, isHorizontal) {
    this.setAvailableShipPositions();

    if (
      placePosition[0] >= 0 &&
      placePosition[0] < this.boardSize &&
      placePosition[1] >= 0 &&
      placePosition[1] < this.boardSize &&
      positionFound(this.availableShipPositions, placePosition)
    ) {
      if (isHorizontal && placePosition[0] + shipLength - 1 < this.boardSize) {
        const adjacentPositionsHorizontal = this.getAdjacentPositionsHorizontal(
          shipLength,
          placePosition,
        );
        const isAdjacent = adjacentPositionsHorizontal.find((ele) =>
          this.filledShipPositions.find(
            (pos) => JSON.stringify(pos) === JSON.stringify(ele),
          ),
        )
          ? true
          : false;

        if (!isAdjacent) {
          return true;
        }
      } else if (
        !isHorizontal &&
        placePosition[1] + shipLength - 1 < this.boardSize
      ) {
        const adjacentPositionsVertical = this.getAdjacentPositionsVertical(
          shipLength,
          placePosition,
        );

        const isAdjacent = adjacentPositionsVertical.find((ele) =>
          this.filledShipPositions.find(
            (pos) => JSON.stringify(pos) === JSON.stringify(ele),
          ),
        )
          ? true
          : false;

        if (!isAdjacent) {
          return true;
        }
      }
    }
    return false;
  }

  getRandomPosition(isShipPosition, isHitPosition, shipLength, isHorizontal) {
    if (isShipPosition) {
      let placePosition = null;
      while (true) {
        placePosition = this.availableShipPositions[
          Math.floor(Math.random() * this.availableShipPositions.length)
        ];
        if (this.isValidPosition(shipLength, placePosition, isHorizontal))
          break;
      }

      return placePosition;
    } else if (isHitPosition) {
      return this.availableAttackPositions[
        Math.floor(Math.random() * this.availableAttackPositions.length)
      ];
    }
  }

  placeShip(shipLength, placePosition, isHorizontal) {
    const newShip = new Ship(shipLength, placePosition, isHorizontal);
    this.aliveShips.push(newShip);
    for (let i = 0; i < shipLength; i++) {
      if (isHorizontal)
        this.filledShipPositions.push([placePosition[0] + i, placePosition[1]]);
      else
        this.filledShipPositions.push([placePosition[0], placePosition[1] + i]);
    }
  }

  placeShipsRandomly(orientation) {
    Object.keys(orientation).forEach((shipName) => {
      const randomDirection = Math.random() > 0.5 ? true : false;
      const shipLength = orientation[shipName].shipLength;
      const randomPosition = this.getRandomPosition(
        true,
        false,
        shipLength,
        randomDirection,
      );
      this.placeShip(shipLength, randomPosition, randomDirection);
    });
  }

  receiveAttack(hitPosition) {
    const aliveShips = [...this.aliveShips];

    for (let ship of aliveShips) {
      if (ship.hit(hitPosition) && ship.isSunk()) {
        ship.currShipLength = ship.length;
        this.aliveShips.splice(getIndex(this.aliveShips, ship), 1);
      }
    }
    this.availableAttackPositions.splice(
      getIndex(this.availableAttackPositions, hitPosition),
      1,
    );
  }

  allShipsSank() {
    if (this.aliveShips.length === 0) return true;
    return false;
  }
}
