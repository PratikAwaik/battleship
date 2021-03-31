export default class Ship {
  constructor(length, position, isHorizontal) {
    this.shipLength = length;
    this.position = position;
    this.isHorizontal = isHorizontal;
    this.hits = 0;
    this.hit = this.hit.bind(this);
    this.isSunk = this.isSunk.bind(this);
  }

  hit(hitPosition) {
    if (
      this.isHorizontal &&
      hitPosition[0] >= this.position[0] &&
      hitPosition[0] <= this.position[0] + this.shipLength - 1 &&
      hitPosition[1] === this.position[1]
    ) {
      this.hits += 1;
      return true;
    } else if (
      !this.isHorizontal &&
      hitPosition[1] >= this.position[1] &&
      hitPosition[1] <= this.position[1] + this.shipLength - 1 &&
      hitPosition[0] === this.position[0]
    ) {
      this.hits += 1;
      return true;
    }

    return false;
  }

  isSunk() {
    if (this.hits === this.shipLength) return true;
    return false;
  }
}
