import { UpdateTotalCountProps } from "./main.d";
import { setupProducts } from "./products/products.ts";
import { setupCounter } from "./counter/counter.ts";
import { setupCart } from "./cart/cart.ts";

async function main() {
	const productsContainer = document.querySelector("#products") as HTMLElement;
	const { updateCount: updateProductCount, getProductById } = await setupProducts({
		container: productsContainer,
		onDecreaseClick,
		onIncreaseClick,
	});

	const {
		addProduct: addProductToCart,
		removeProduct: removeProductFromCart,
		updateCount: updateCartCount,
	} = setupCart({
		container: productsContainer,
		onDecreaseClick,
		onIncreaseClick,
	});

	const { increase, decrease, getTotalCount, getCountByProductId } = setupCounter();

	const updateTotalCount = ({ totalCount }: UpdateTotalCountProps) => {
		document.querySelector(".total_count")!.textContent = String(totalCount);
	};

	function onIncreaseClick({ productId }: { productId: string }): void {
		increase({ productId });
		const count = getCountByProductId({ productId });
		if (count === 1) {
			addProductToCart({ product: getProductById({ productId }) });
		}
		updateTotalCount({ totalCount: getTotalCount() });
	}

	function onDecreaseClick({ productId }: { productId: string }): void {
		decrease({ productId });
		const count = getCountByProductId({ productId });
		if (count === 0) {
			removeProductFromCart({ product: getProductById({ productId }) });
		}
		updateTotalCount({ totalCount: getTotalCount() });
	}

	document.querySelector(".btn-cart")?.addEventListener("click", () => {
		document.body.classList.add("displaying_cart");
	});

	document.querySelector(".btn-close-cart")?.addEventListener("click", () => {
		document.body.classList.remove("displaying_cart");
	});

	document.querySelector(".cart-dimmed-bg")?.addEventListener("click", () => {
		document.body.classList.remove("displaying_cart");
	});
}

main();
