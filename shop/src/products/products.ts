/**
 * Products API: https://learnwitheunjae.dev/api/sinabro-js/ecommerce
 */
import products from "../products.json?raw";
import { findElement } from "../util/util";
import {
  CreateProductElementProps,
  SetupProductsProps,
  Product,
  ProductMap,
  UpdateCountProps,
  GetProductByIdProps,
} from "./products.d";

async function fetchProductsAPI() {
  if (process.env.NODE_ENV === "development") {
    return JSON.parse(products);
  } else {
    return await fetch("https://learnwitheunjae.dev/api/sinabro-js/ecommerce");

    // const response = (await getProductInfos()) as Response;
    // const json = await response.json();
    // console.log(json);
  }
}

export function createProductElement({
  product,
  count = 0,
}: CreateProductElementProps): HTMLDivElement {
  const productElement = document.createElement("div");
  productElement.classList.add("product");
  productElement.setAttribute("data-product-id", product.id);

  const productImage = document.createElement("img");
  productImage.setAttribute("src", product.images[0]);
  productImage.setAttribute("alt", product.name);

  const productParagraph = document.createElement("p");
  productParagraph.textContent = product.name;

  const productPriceAndCounter = document.createElement("div");
  productPriceAndCounter.classList.add(
    "flex",
    "items-center",
    "justify-between"
  );

  const productPrice = document.createElement("span");
  productPrice.textContent = `Price: ${product.regularPrice}`;

  const productCounter = document.createElement("div");
  productCounter.classList.add("flex", "items-center", "gap-2");
  const productDecreaseBtn = document.createElement("button");
  productDecreaseBtn.setAttribute("type", "button");
  productDecreaseBtn.classList.add(
    "btn-decrease",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "bg-green-200",
    "hover:bg-green-300",
    "text-green-800",
    "py-1",
    "px-3",
    "w-9",
    "h-9",
    "rounded-full"
  );
  productDecreaseBtn.textContent = "-";
  const productCount = document.createElement("span");
  productCount.classList.add("cart-count", "text-green-800");
  productCount.textContent = `${count === 0 ? 0 : count}`;
  const productIncreaseBtn = document.createElement("button");
  productIncreaseBtn.classList.add(
    "btn-increase",
    "bg-green-200",
    "hover:bg-green-300",
    "text-green-800",
    "py-1",
    "px-3",
    "w-9",
    "h-9",
    "rounded-full"
  );
  productIncreaseBtn.textContent = "+";

  productElement.appendChild(productImage);
  productElement.appendChild(productParagraph);
  productElement.appendChild(productPriceAndCounter);
  productPriceAndCounter.appendChild(productPrice);
  productPriceAndCounter.appendChild(productCounter);
  productCounter.appendChild(productDecreaseBtn);
  productCounter.appendChild(productCount);
  productCounter.appendChild(productIncreaseBtn);

  return productElement;
}

export async function setupProducts({
  container,
  onDecreaseClick,
  onIncreaseClick,
}: SetupProductsProps) {
  const products: Product[] = await fetchProductsAPI();
  const productMap: ProductMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  products.forEach((product) => {
    const productElement = createProductElement({ product });
    container.appendChild(productElement);
  });

  // When Click Increase / Decrease Button
  container.addEventListener("click", (event) => {
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

  const updateCount = ({ productId, count }: UpdateCountProps) => {
    const productElement = container.querySelector(
      `.product[data-product-id='${productId}']`
    );
    const cartCountElement = productElement?.querySelector(".cart-count");
    cartCountElement!.textContent = String(count);
  };

  const getProductById = ({ productId }: GetProductByIdProps) => {
    return productMap[productId];
  };

  return { updateCount, getProductById };
}
