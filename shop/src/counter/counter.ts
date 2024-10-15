import { CountMap, Increase, Decrease } from "./counter.d";

export function setupCounter() {
  const countMap: CountMap = {};

  const increase: Increase = ({ productId }) => {
    if (countMap[productId]) {
      countMap[productId] = 0;
    }
    countMap[productId] += 1;
    return countMap[productId];
  };

  const decrease: Decrease = ({ productId }) => {
    if (countMap[productId]) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;
    return countMap[productId];
  };

  const getTotalCount = () => {
    let count = 0;
    Object.values(countMap).forEach((number) => {
      count += number;
    });
    return count;
  };

  return {
    increase,
    decrease,
    getTotalCount,
  };
}
