import React, { useState } from 'react'
import './App.css'
import {ethers} from 'ethers'
import { useAccountsState } from './state/accounts';

function App() {

  const [wallet, setWallet] = useState<any|undefined>(undefined);
  const {
    accounts,
    addAccount,
    resetAccounts
  } = useAccountsState();


  const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    setWallet(wallet);
    addAccount({
      address: wallet.address,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
      seedPhrase: wallet.mnemonic.phrase
    });
  }

  return (
    <>
      <div>
        <div>
          Welcome to Stimpacks
        </div>
        <div>
          Please choose an option
        </div>
        <div className='flex gap-10'>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                createWallet();
              }}
            >
              Create Wallet
            </button>
          </div>
          <div>
            <button>
              Import Wallet
            </button>
          </div>
        </div>
        {
          wallet && (
            <div className='mt-10'>
              <div>
                address: {wallet.address}
              </div>
              <div>
                public key: {wallet.publicKey}
              </div>
              <div>
                private key: {wallet.privateKey}
              </div>
              <div>
                Seed phrase: {wallet.mnemonic.phrase}
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
