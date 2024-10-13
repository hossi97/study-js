/**
 * Products API: https://learnwitheunjae.dev/api/sinabro-js/ecommerce
 */
import products from "./products.json?raw";

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

/**
 *  <img src="${product.images[0]}" alt="Image of ${product.name}" />
    <p>${product.name}</p>
    <div class="flex items-center justify-between">
      <span>Price: ${product.regularPrice}</span>
      <div>
        <button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
        <span class="cart-count text-green-800">${
          count === 0 ? "" : count
        }</span>
        <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
      </div>
    </div>
 */

export function createProductElement(product: Product, count: number = 0): HTMLDivElement {
	const productContainer = document.createElement("div");
	productContainer.classList.add("product");
	productContainer.setAttribute("data-product-id", product.id);

	const productImage = document.createElement("img");
	productImage.setAttribute("src", product.images[0]);
	productImage.setAttribute("alt", product.name);

	const productParagraph = document.createElement("p");
	productParagraph.textContent = product.name;

	const productPriceAndCounter = document.createElement("div");
	productPriceAndCounter.classList.add("flex", "items-center", "justify-between");

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
		"rounded-full",
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
		"rounded-full",
	);
	productIncreaseBtn.textContent = "+";

	productContainer.appendChild(productImage);
	productContainer.appendChild(productParagraph);
	productContainer.appendChild(productPriceAndCounter);
	productPriceAndCounter.appendChild(productPrice);
	productPriceAndCounter.appendChild(productCounter);
	productCounter.appendChild(productDecreaseBtn);
	productCounter.appendChild(productCount);
	productCounter.appendChild(productIncreaseBtn);

	return productContainer;
}

export async function setupProducts(container: HTMLDivElement) {
	const products: Product[] = await fetchProductsAPI();
	const productMap: ProductMap = {};
	products.forEach((product) => {
		productMap[product.id] = product;
	});

	products.forEach((product) => {
		const productElement = createProductElement(product);
		container.appendChild(productElement);
	});
}
