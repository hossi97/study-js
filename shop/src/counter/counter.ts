import { bindReactiveState } from "../reactivity/reactivity";
import { CountMap, Increase, Decrease, GetCountByProductId } from "./counter.d";

export function setupCounter() {
	const [getCountMap, setCountMap] = bindReactiveState({
		name: "countMap",
		defaultValue: {},
	});

	const increase: Increase = ({ productId }) => {
		const newCountMap: CountMap = { ...getCountMap() };
		if (newCountMap[productId]) {
			newCountMap[productId] = 0;
		}
		newCountMap[productId] += 1;
		setCountMap(newCountMap);
	};

	const decrease: Decrease = ({ productId }) => {
		const newCountMap: CountMap = { ...getCountMap() };
		if (newCountMap[productId]) {
			newCountMap[productId] = 0;
		}
		newCountMap[productId] -= 1;
		setCountMap(newCountMap);
	};

	const getTotalCount = () => {
		let totalCount = 0;
		Object.values(getCountMap()).forEach((count) => {
			totalCount += count;
		});
		return totalCount;
	};

	const getCountByProductId: GetCountByProductId = ({ productId }) => {
		return getCountMap()[productId] || 0;
	};

	return {
		increase,
		decrease,
		getTotalCount,
		getCountByProductId,
	};
}
