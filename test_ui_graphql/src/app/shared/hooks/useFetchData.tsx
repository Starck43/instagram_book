import React, {useEffect, useState} from 'react';
import request from "graphql-request";
import {CompanyQueryQuery} from "graphql/graphql";

export const useFetchData = (url: string, query: string) => {
    const [data, setData] = useState<CompanyQueryQuery>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        request(url, query, {})
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    console.log(data.error)
                    //throw new Error(data.error)
                }

                setData(data);
                setIsLoading(false);
            });
    }, []);

    return {data, isLoading, error}
};
