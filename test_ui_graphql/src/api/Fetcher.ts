import {PatchedRequestInit} from "graphql-request/dist/types";


export function fetcher<TData, TVariables>(url: string, requestInit: PatchedRequestInit, query: string, variables?: TVariables) {
    return async (): Promise<TData> => {
        const res = await fetch(url, {
            method: 'POST',
            ...requestInit as RequestInit,
            body: JSON.stringify({ query, variables }),
        });

        const json = await res.json();

        if (json.errors) {
            const { message } = json.errors[0];

            throw new Error(message);
        }

        return json.data;
    }
}
