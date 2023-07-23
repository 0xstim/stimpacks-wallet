import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { useAccountsState } from "./state/accounts";
import { Account } from "./packages/lib/interfaces/accounts";

function App() {
  const { accounts, addAccount, removeAccount } = useAccountsState();
  const [currentAccount, setCurrentAccount] = useState<Account | undefined>(
    undefined
  );

  const [accountToUse, setAccountToUse] = useState<Account>(accounts[0]);

  const [seedPhrase, setSeedPhrase] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");

  const [walletFromSeedPhrase, setWalletFromSeedPhrase] = useState<any>();

  const [error, setError] = useState<string>("");

  const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    setCurrentAccount({
      address: wallet.address,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
      seedPhrase: wallet.mnemonic.phrase,
    });
    addAccount({
      address: wallet.address,
      publicKey: wallet.publicKey,
      privateKey: wallet.privateKey,
      seedPhrase: wallet.mnemonic.phrase,
    });
  };

  const importSeedPhrase = () => {
    const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
    if (accounts.some((account) => account.address === wallet.address)) {
      setError("Account already exists");
    } else {
      addAccount({
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        seedPhrase: wallet.mnemonic.phrase,
      });
    }
  };

  const importPrivateKey = () => {
    const wallet = new ethers.Wallet(privateKey);
    if (accounts.some((account) => account.address === wallet.address)) {
      setError("Account already exists");
    } else {
      addAccount({
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        seedPhrase: wallet.mnemonic.phrase,
      });
    }
  };

  const chooseAccount = (account: Account) => {
    setAccountToUse(account);
  };

  function exportUserInfo(userInfo: string) {
    const fileData = JSON.stringify(userInfo);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "wallet.json";
    link.href = url;
    link.click();
  }


  return (
    <div
      className="flex gap-30"
      style={{
        width: "100%",
        padding: "8rem",
        borderRight: "1px solid #000",
      }}
    >
      <div>
        <div style={{ fontSize: "32px" }}>Welcome to Stimpacks</div>
        <div>
          <div>Count Accounts: {accounts.length}</div>
        </div>
        <div>Please choose an option</div>
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
        <div className="mt-20">or</div>
        <div className="mt-20">
          Import Wallet from Seed Phrase or Private Key
        </div>

        <div className="flex gap-10 mt-10">
          <input
            type="text"
            value={seedPhrase}
            onChange={(e) => {
              setSeedPhrase(e.target.value);
            }}
          />
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                importSeedPhrase();
              }}
            >
              Import seed
            </button>
          </div>
        </div>
        <div className="flex gap-10 mt-10">
          <input
            type="text"
            value={privateKey}
            onChange={(e) => {
              setPrivateKey(e.target.value);
            }}
          />
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                importPrivateKey();
              }}
            >
              Import private key
            </button>
          </div>
        </div>
        <div>
          {error !== "" && (
            <div className="mt-10" style={{ color: "red" }}>
              {error}
            </div>
          )}
        </div>
      </div>
      <div style={{ maxWidth: "700px" }}>
        {currentAccount && (
          <div>
            <div>
              Address:{" "}
              <span style={{ color: "green" }}>{currentAccount?.address}</span>
            </div>
            <div>Public Key: {currentAccount?.publicKey}</div>
            <div>
              Private Key:{" "}
              <span style={{ color: "green" }}>
                {currentAccount?.privateKey}
              </span>
            </div>
            <div className="flex">
              <div>
                Seed Phrase:{" "}
                <span style={{ color: "green" }}>
                  {currentAccount?.seedPhrase}
                </span>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    exportUserInfo(JSON.stringify(currentAccount));
                  }}
                >
                  download
                </button>
              </div>
            </div>
            
          </div>
        )}

        <div className="mt-20" style={{ fontSize: "20px" }}>
          Added Accounts:
        </div>
        <div className="flex gap-20" style={{ flexDirection: "column" }}>
          {accounts && accounts.length > 0 && (
            <div className="flex gap-10">
              <label>
                Choose Account:
                <select
                  name="accounts"
                  id="accounts"
                  value={accountToUse ? accountToUse.address : ""}
                  onChange={(e) => {
                    e.preventDefault();
                    const account = accounts.find(
                      (account) => account.address === e.target.value
                    );
                    if (account) {
                      chooseAccount(account);
                    }
                  }}
                >
                  {accounts.map((account) => (
                    <option key={account.address} value={account.address}>
                      {account.address}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (accountToUse) removeAccount(accountToUse.address);
                    removeAccount();
                  }}
                >
                  Remove Account
                </button>
              </div>
            </div>
          )}
          {accounts.length > 0 && !accountToUse ? (
            <div>
              <div>Address: {accounts[0]?.address}</div>
              <div>
                Public Key: <span>{accounts[0]?.publicKey}</span>
              </div>
              <div>
                Private Key:{" "}
                <span style={{ color: "green" }}>
                  {accounts[0]?.privateKey}
                </span>
              </div>
              <div>
                Seed Phrase:{" "}
                <span style={{ color: "green" }}>
                  {accounts[0]?.seedPhrase}
                </span>
              </div>
            </div>
          ) : (
            accountToUse && (
              <div>
                <div>Address: {accountToUse?.address}</div>
                <div>
                  Public Key: <span>{accountToUse?.publicKey}</span>
                </div>
                <div>
                  Private Key:{" "}
                  <span style={{ color: "green" }}>
                    {accountToUse?.privateKey}
                  </span>
                </div>
                <div>
                  Seed Phrase:{" "}
                  <span style={{ color: "green" }}>
                    {accountToUse?.seedPhrase}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
