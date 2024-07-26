export const url_matches_with_pathname = ({
	url,
	pathname
}: {
	url: string | undefined;
	pathname: string;
}): boolean => url !== undefined && new RegExp(`${url}/?$`).test(pathname);
