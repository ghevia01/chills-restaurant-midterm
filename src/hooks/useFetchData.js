import { useState, useEffect } from 'react';

import { API_FETCH_STATUS } from '../constants/apiFetchStatus';

// Custom hook to fetch data from the server
export const useFetchData = (fetchFunction) => {

    // Set initial state to null
    const [data, setData] = useState(null);

    // Set initial fetch status to pending
    const [fetchStatus, setFetchStatus] = useState(API_FETCH_STATUS.PENDING);

    // Set initial error state to null
    const [error, setError] = useState(null);

    useEffect(() => {
        // Variable to keep track of whether the component is mounted or not
        let isMounted = true;

        // Set initial fetch status to pending
        setFetchStatus(API_FETCH_STATUS.PENDING);

        const fetchData = async () => {
            try {
                // Call the provided fetchFunction
                const { result, data: fetchedData, message } = await fetchFunction();

                // If the component is not mounted, do not update the state
                if (!isMounted) return;

                // If the fetch is successful, update the data and fetchStatus states
                if (result === "success") {
                    setData(fetchedData);
                    setFetchStatus(API_FETCH_STATUS.SUCCESS);
                } else {
                    // If the fetch is not successful, set the error state and fetchStatus state
                    setError(message || 'No data found.');
                    setFetchStatus('error');
                }
            } catch (err) {
                if (!isMounted) return;

                // Set the error state and fetchStatus state
                setError(err.message || 'Failed to fetch data.');
                setFetchStatus(API_FETCH_STATUS.ERROR);
            }
        };

        // Execute the fetchData function
        fetchData();

        return () => {
            // When the component unmounts, set the isMounted variable to false
            isMounted = false;
        };
    }, [fetchFunction]);

    return { data, fetchStatus, error };
};
