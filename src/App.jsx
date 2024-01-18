import React, { useState } from 'react';
import { AuthenticatedTemplate } from '@azure/msal-react';

import './styles/App.css';
import { ProfileContent } from './components/ProfileContent';
import { PageLayout } from './components/PageLayout';
import { SearchTable } from './components/SearchTable';


const App = () => {
    const [childData, setChildData] = useState('');

    const handleChildData = (data) => {
        setChildData(data);
    };

    return (
        <div className="App">
            <PageLayout onDataChange={handleChildData} />
            <AuthenticatedTemplate>
                <ProfileContent />
                <SearchTable childData={childData} />
            </AuthenticatedTemplate>
        </div>
    );
};

export default App;