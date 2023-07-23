import { atomWithStorage, RESET } from "jotai/utils";
import { Account } from "../../packages/lib/interfaces/accounts";
import { useAtom } from "jotai";
import { encryptWithAES } from "../../packages/lib/encryption";

export const accountsAtom = atomWithStorage<Account[]>(
  "stimpacks-accounts",
  []
);

export const useAccountsState = () => {
  const [accounts, setAccounts] = useAtom(accountsAtom);

  const addAccount = (account: Account) => {
    const seedPhraseEncrypted = encryptWithAES(
      account.seedPhrase,
      account.privateKey
    );
    const privateKeyEncrypted = encryptWithAES(
      account.privateKey,
      account.seedPhrase
    );

    setAccounts((prev) => [...prev, {
      ...account,
      seedPhrase: seedPhraseEncrypted,
      privateKey: privateKeyEncrypted,
    }]);
  };

  const removeAccount = (accountAddress?: string) => {
    if(accountAddress){
      setAccounts((prev) => prev.filter((account) => account.address !== accountAddress));
    }
    else {
      setAccounts((prev) => prev.slice(1));
    }
  }

  const resetAllAccounts = () => {
    setAccounts(RESET);
  };

  return { accounts, addAccount, removeAccount , resetAllAccounts };
};
