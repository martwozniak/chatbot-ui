import { API_ENTRYPOINT, AUTH_ENDPOINT, PUBLIC_API_ENTRYPOINT } from "./const";

const BASE_URL=`${API_ENTRYPOINT}/${PUBLIC_API_ENTRYPOINT}/${AUTH_ENDPOINT}`;

export const setTokenCookie = (token: string) => {
    const url = `${BASE_URL}/login`;

    fetch(url, {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
    });
};

export const removeTokenCookie = () => {
const url = `${BASE_URL}/logout`;

fetch(url, {
    method: "post",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
});
};