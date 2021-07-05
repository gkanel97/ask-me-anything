import { fetchProtected, FetchError } from "./auth";

async function httpPost(url: string, data: object, init?: ResponseInit): Promise<any> {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        ...init
    })
    .then(async response => {
        if (response.ok) {
            if (parseInt(response.headers.get("Content-Length") || "0") !== 0) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        else {
            const errorResponse = await response.json();
            throw new FetchError(errorResponse.statusCode, errorResponse.message);
        }
    });
}

async function httpPostProtected(url: string, data: object, init?: ResponseInit): Promise<any> {
    return fetchProtected(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        ...init
    })
    .then(async response => {
        if (response.ok) {
            if (parseInt(response.headers.get("Content-Length") || "0") !== 0) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        else {
            const errorResponse = await response.json();
            throw new FetchError(errorResponse.statusCode, errorResponse.message);
        }
    });
}

async function httpGet(url: string, init?: ResponseInit): Promise<any> {
    return fetch(url, {
        method: "GET",
        mode: "cors",
        ...init
    })
    .then(async response => {
        if (response.ok) {
            if (parseInt(response.headers.get("Content-Length") || "0") !== 0) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        else {
            const errorResponse = await response.json();
            throw new FetchError(errorResponse.statusCode, errorResponse.message);
        }
    });
}

async function httpGetProtected(url: string, init?: ResponseInit): Promise<any> {
    return fetchProtected(url, {
        method: "GET",
        mode: "cors",
        ...init
    })
    .then(async response => {
        if (response.ok) {
            if (parseInt(response.headers.get("Content-Length") || "0") !== 0) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        else {
            const errorResponse = await response.json();
            throw new FetchError(errorResponse.statusCode, errorResponse.message);
        }
    });
}

export { httpPost, httpPostProtected, httpGet, httpGetProtected };