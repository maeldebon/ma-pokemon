export const get = (url, token) => {
    const response = fetch(url, {
        method: "get",
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        }),
    });

    return response;
};
