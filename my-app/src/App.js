import React from 'react';
import Bridge from './components/Bridge';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoBackground from './components/CryptoBackground';
import { WalletKitProvider } from '@mysten/wallet-kit';

function App() {
  return (
    <WalletKitProvider>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <CryptoBackground />  {/* Add the component here */}
        <Bridge />
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          theme="dark"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover 
        />
      </div>
    </WalletKitProvider>
  );
}

export default App;