export type IPagesState = {
	[key: number]: Record<string, string | number | undefined>;
};

export type PageProps = {
	pages_state: IPagesState;
	page: number;
	on_submit: (data: Record<string, string | number | undefined>) => void;
	on_gotopage: (page: number) => void;
};

export type FormFieldState = { value: string; error: string[] };
