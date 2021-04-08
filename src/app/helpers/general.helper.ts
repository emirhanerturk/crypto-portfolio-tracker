

export function CalculatePercentChange(price1: number, price2: number): number {
  if (price1 < price2){
    return (price2 - price1) / price1 * 100;
  } else if (price1 > price2) {
    return -((price1 - price2) / price1 * 100);
  }
  return 0;
}
