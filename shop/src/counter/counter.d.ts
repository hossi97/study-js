export type CountMap = {
  [key: string]: number;
};

export type Increase = ({ productId: string }) => number;
export type Decrease = ({ productId: string }) => number;
