import {
  AddProductProps,
  RemoveProductProps,
  SetupCartProps,
  UpdateCountProps,
} from "./cart.d";
import { createProductElement } from "../products/products";
import { findElement } from "../util/util";

export function setupCart({
  container,
  onDecreaseClick,
  onIncreaseClick,
}: SetupCartProps) {
  container.addEventListener("click", (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const productElement = findElement({
      startElement: targetElement,
      selector: ".product",
    });
    const productId = productElement?.getAttribute("data-product-id");

    if (targetElement.matches(".btn-decrease")) {
      onDecreaseClick({ productId });
    } else if (targetElement.matches(".btn-increase")) {
      onIncreaseClick({ productId });
    }
  });

  const addProduct = ({ product }: AddProductProps) => {
    const productElement = createProductElement({ product });
    container.appendChild(productElement);
  };

  const removeProduct = ({ product }: RemoveProductProps) => {
    const productElement = container.querySelector(
      `.product[data-product-id='${product.id}']`
    );
    productElement?.remove();
  };

  const updateCount = ({ productId, count }: UpdateCountProps) => {
    const productElement = container.querySelector(
      `.product[data-product-id='${productId}']`
    );
    const cartCountElement = productElement?.querySelector(".cart-count");
    cartCountElement!.textContent = String(count);
  };

  return {
    addProduct,
    removeProduct,
    updateCount,
  };
}
