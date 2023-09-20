import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from './context';
import { useEffect } from 'react';
import Web3 from 'web3';


import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));



// Add an effect to fetch the chain ID
useEffect(() => {
    const fetchChainId = async () => {
        const web3 = new Web3(window.ethereum);  // Assuming MetaMask or a similar extension
        const chainId = await web3.eth.getChainId();
        console.log("Current Chain ID:", chainId);
    };

    fetchChainId();
}, []);


root.render(
    <ThirdwebProvider desiredChainId={ChainId.Goerli}
        clientId="d79e72456ec1c1db4ca48015626c0a99"
    >
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>

        </Router>

    </ThirdwebProvider>
)