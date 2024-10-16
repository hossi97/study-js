export type CountMap = {
	[key: string]: number;
};

export type Increase = ({ productId: string }) => void;
export type Decrease = ({ productId: string }) => void;
export type GetCountByProductId = ({ productId: string }) => number;
