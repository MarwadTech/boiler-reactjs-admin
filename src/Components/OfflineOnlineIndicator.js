import React, { useEffect, useState } from 'react'
import { globeIcon } from '../Assets/Index'; // Importing icon

// Component for displaying an alert when the user is offline
export const OfflineOnlineAlert = () => {
    // State to track online/offline status
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Event handler for online status change
        const handleOnline = () => setIsOnline(true);
        // Event handler for offline status change
        const handleOffline = () => setIsOnline(false);

        // Add event listeners for online and offline events
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Clean up event listeners on component unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <>
            {/* Display alert when offline */}
            {!isOnline && <div className={`d-flex justify-content-center bg-opacity-75  w-100 position-fixed start-0 top-0 z-2`} >
                <div className='m-1 my-4'>

                    <div class="alert alert-danger" role="alert">
                        <img src={globeIcon} alt="ofline" className='me-2' />
                        You are offline. Please connect to the internet.
                    </div>
                </div>
            </div>}
        </>
    )
}

// Hook for handling API calls based on online/offline status
export const OnlineStatusApiCalling = ({ fetchData, setIsLoading, page, id, filter }) => {
    useEffect(() => {
        // Function to handle online status change
        const handleOnlineStatusChange = () => {
            if (navigator.onLine) {
                fetchData();
            } else {
                setIsLoading && setIsLoading(true);
            }
        };

        // Add event listeners for online and offline events
        window.addEventListener("online", handleOnlineStatusChange);
        window.addEventListener("offline", handleOnlineStatusChange);

        // Initial check for online status
        handleOnlineStatusChange();

        // Clean up event listeners on component unmount
        return () => {
            window.removeEventListener("online", handleOnlineStatusChange);
            window.removeEventListener("offline", handleOnlineStatusChange);
        };
    }, [page, id, filter]);

}