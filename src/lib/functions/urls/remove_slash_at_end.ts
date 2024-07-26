/** Credit
 * https://www.designcise.com/web/tutorial/how-to-remove-a-trailing-slash-from-a-string-in-javascript#using-endswith
 */
export const remove_slash_from_end = (url: string): string =>
	url.endsWith("/") ? url.slice(0, -1) : url;
