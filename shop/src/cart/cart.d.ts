import { Product } from "./../products/products.d";
export type SetupCartProps = {
  container: HTMLElement;
  onDecreaseClick: Function;
  onIncreaseClick: Function;
};

export type AddProductProps = {
  product: Product;
};

export type RemoveProductProps = {
  product: Product;
};

export type UpdateCountProps = {
  productId: string;
  count: number;
};
