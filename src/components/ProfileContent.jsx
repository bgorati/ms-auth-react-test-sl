import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';

import { loginRequest } from '../authConfig';
import { callMsGraph } from '../graph';
import { ProfileData } from '../components/ProfileData';

export const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => {
                    setGraphData(response);
                    console.log('response->', response)
                });
            });
    }

    useEffect(() => {
        RequestProfileData();
    }, []);

    return (
        <div className="my-profile">
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : null}
        </div>
    );
};
