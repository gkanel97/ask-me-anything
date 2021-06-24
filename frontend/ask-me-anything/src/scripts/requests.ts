import { fetchProtected } from "./auth"

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
    .then(response => {
        if (response.ok) {
            if (parseInt(response.headers.get("Content-Length") || "0") !== 0) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        else {
            throw new FetchError(response.status, response.statusText);
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
    .then(response => {
        if (response.ok) {
            if (parseInt(response.headers.get("Content-Length") || "0") !== 0) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        else {
            throw new FetchError(response.status, response.statusText);
        }
    });
}

async function httpGet(url: string, init?: ResponseInit): Promise<any> {
    return fetch(url, {
        method: "GET",
        mode: "cors",
        ...init
    })
    .then(response => {
        if (response.ok) {
            if (parseInt(response.headers.get("Content-Length") || "0") !== 0) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        else {
            throw new FetchError(response.status, response.statusText);
        }
    });
}

async function httpGetProtected(url: string, init?: ResponseInit): Promise<any> {
    return fetchProtected(url, {
        method: "GET",
        mode: "cors",
        ...init
    })
    .then(response => {
        if (response.ok) {
            if (parseInt(response.headers.get("Content-Length") || "0") !== 0) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        else {
            throw new FetchError(response.status, response.statusText);
        }
    });
}

export { httpPost, httpPostProtected, httpGet, httpGetProtected };