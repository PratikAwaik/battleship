export function positionFound(arr, position) {
  return arr.find((ele) => JSON.stringify(ele) === JSON.stringify(position))
    ? true
    : false;
}

export function getIndex(arr, position) {
  let index = null;
  arr.find((ele, ind) =>
    JSON.stringify(ele) === JSON.stringify(position) ? (index = ind) : null,
  );
  return index;
}
