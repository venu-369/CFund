import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from './context';



import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <ThirdwebProvider ChainId={ChainId.Goerli}
        clientId="d79e72456ec1c1db4ca48015626c0a99"
    >
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>

        </Router>

    </ThirdwebProvider>
)