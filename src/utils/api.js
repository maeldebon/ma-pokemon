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

export const post = (url, data, token) => {
    const response = fetch(url, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(data),
    });

    return response;
};

export const patch = (url, data, token) => {
    const response = fetch(url, {
        method: "patch",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(data),
    });

    return response;
};

export const put = (url, data, token) => {
    const response = fetch(url, {
        method: "put",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(data),
    });

    return response;
};
