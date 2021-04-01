import Gameboard from "./gameboard";

export default class Player {
  constructor() {
    this.board = new Gameboard(10);
  }

  attackEnemy(enemy, hitPosition) {
    enemy.board.receiveAttack(hitPosition);
  }
}
