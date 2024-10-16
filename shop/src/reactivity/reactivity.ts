import { BindReactiveStateProps, keyValueMap } from "./reactivity.d";

export function bindReactiveState({ name, defaultValue }: BindReactiveStateProps): [() => keyValueMap, (newValue: keyValueMap) => void] {
	let value: keyValueMap = defaultValue;

	const getter = () => {
		return value;
	};

	const setter = (newValue: keyValueMap) => {
		const oldKeys = Object.keys(value);
		const newKeys = Object.keys(newValue);
		const changedKeys: string[] = [];
		newKeys.forEach((key) => {
			if (value[key] !== newValue[key]) {
				changedKeys.push(key);
			} else if (!oldKeys.includes(key)) {
				changedKeys.push(key);
			}
		});

		changedKeys.forEach((key) => {
			const elements = Array.from(document.querySelectorAll(`[data-subscribe-to='${name}'][data-subscription-path='${key}']`));
			elements.forEach((element) => {
				element.textContent = String(newValue[key]);
			});
		});

		value = newValue;
	};

	return [getter, setter];
}
