export type BindReactiveStateProps = {
	name: string;
	defaultValue: keyValueMap;
};

export type keyValueMap = {
	[key: string]: number;
};
