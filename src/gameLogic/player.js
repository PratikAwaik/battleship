import Gameboard from "./gameboard";

export default class Player {
  constructor() {
    this.board = new Gameboard(10);
  }

  // allCoordinates = (array of coordinates of all ships)
  // allDirections = (array of direction of all ships)(horizontal or vertical) [boolean array] true if isHorizontal, false otherwise
  // placeAllShips(shipsLength, allCoordinates, allDirections) {
  //   shipsLength.forEach((shipLength, index) => {
  //     this.board.placeShip(
  //       shipLength,
  //       allCoordinates[index],
  //       allDirections[index],
  //     );
  //   });
  // }

  attackEnemy(enemy, hitPosition) {
    enemy.board.receiveAttack(hitPosition);
  }
}
