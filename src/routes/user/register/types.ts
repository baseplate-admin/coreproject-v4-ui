export type IPageState = {
	[key: number]: Record<string, string | number>;
};

export type PageProps = {
	pages_state: IPageState[];
	page: number;
	onsubmit: (data: any) => void;
	ongotopage: (page: number) => void;
};