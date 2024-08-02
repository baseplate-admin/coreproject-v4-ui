const isEmpty= (value: string | any[] | undefined) => {
    if (typeof value === "undefined") {
        return true;
    }
    if (typeof value === "object" && value?.length === 0) {
        return true;
    }
    if (typeof value === "string" && value === null) {
        return true;
    }
    return false;
}
export default isEmpty