import { setupProducts } from "./products.ts";

async function main() {
	const productsContainer = document.querySelector("#products") as HTMLDivElement;
	setupProducts(productsContainer);
}

main();
