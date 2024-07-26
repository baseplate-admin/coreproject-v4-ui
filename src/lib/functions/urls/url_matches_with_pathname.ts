export const url_matches_with_pathname = ({
	url,
	pathname
}: {
	url: string | undefined;
	pathname: string;
}): boolean => {
	if (url === undefined) return false;

	const regex = new RegExp(`${url}\/?$`);
	if (regex.test(pathname)) {
		return true;
	}
	return false;
};
