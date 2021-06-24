interface FetchError extends Error {
    status: number,
    message: string
}

interface FetchErrorConstructor extends ErrorConstructor {
    new(status: number, message: string): FetchError;
    (status: number, message: string): FetchError;
    readonly prototype: FetchError;
}

declare var FetchError: FetchErrorConstructor;