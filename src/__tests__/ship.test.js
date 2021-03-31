import Ship from "../gameLogic/ship";

describe("Ship Works", () => {
  test("Hits the ship when Horizontal", () => {
    const ship = new Ship(4, [6, 3], true);
    expect(ship.hit([8, 3])).toBeTruthy();
  });

  test("Does not hit the ship when Horizontal", () => {
    const ship = new Ship(4, [6, 3], true);
    expect(ship.hit([5, 3])).toBeFalsy();
  });

  test("Hits the ship when vertical", () => {
    const ship = new Ship(4, [6, 3], false);
    expect(ship.hit([6, 6])).toBeTruthy();
  });

  test("Does not hit the ship when vertical", () => {
    const ship = new Ship(4, [6, 3], true);
    expect(ship.hit([5, 5])).toBeFalsy();
  });

  test("Ship of length 1 sinks in 1 hit", () => {
    const ship = new Ship(1, [6, 3], true);
    ship.hit([6, 3]);
    expect(ship.isSunk()).toBeTruthy();
  });

  test("Ship of length 3 sinks in 3 hits", () => {
    const ship = new Ship(3, [4, 4], true);
    ship.hit([4, 4]);
    ship.hit([5, 4]);
    ship.hit([6, 4]);
    expect(ship.isSunk()).toBeTruthy();
  });
});
