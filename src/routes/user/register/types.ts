type IPageState = {
	[key: number]: Record<string, string | number>;
};

export type page_prop = {
	pages_state: IPageState;
	page: number;
};
