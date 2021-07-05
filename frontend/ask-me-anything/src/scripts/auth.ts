import { AUTH_BASE_URL } from "../configuration/URLS";

function decode(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
}

class FetchError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = "FetchError";
        this.status = status;
    }

    toJSON() {
        return {
            name: this.name,
            status: this.status,
            message: this.message
        };
    }

    toString() {
        return `FetchError({status: ${this.status}, message: ${this.message}})`;
    }
}

FetchError.prototype.toString = function() {
    return `FetchError({status: ${this.status}, message: ${this.message}})`
}

async function fetchProtected(url: RequestInfo, init: RequestInit): Promise<Response> {
    const access_token = localStorage.getItem("access_token");

    try {
        const { exp } = decode(access_token);

        if (Date.now() >= exp * 1000) {
            const refresh_token = localStorage.getItem("refresh_token");

            fetch(`${AUTH_BASE_URL}/refresh`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    refresh_token: refresh_token
                })
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        throw new FetchError(response.status, response.statusText);
                    }
                })
                .then(payload => {
                    localStorage.setItem("access_token", payload.access_token);
                });
        }

        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                'Authorization': `Bearer ${access_token}`
            }
        });
    }
    catch (e) {
        if (e instanceof TypeError) {
            throw new Error("Access token unavailable");
        }
        else {
            throw e;
        }
    }
}

function isValidToken(token: string): boolean {
    try {
        const { exp } = decode(token);
        return (Date.now() < exp * 1000);
    }
    catch {
        return false;
    }
}

export { fetchProtected, isValidToken, FetchError };