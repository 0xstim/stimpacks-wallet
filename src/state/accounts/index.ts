import {atomWithStorage, RESET} from 'jotai/utils'
import { Account } from '../../packages/lib/interfaces/accounts'
import { useAtom } from 'jotai';

export const accountsAtom = atomWithStorage<Account[]>('accounts', []);

export const useAccountsState = () => {
    const [accounts, setAccounts] = useAtom(accountsAtom)
    const addAccount = (account: Account) => {
        setAccounts([...accounts, account])
    }

    const resetAccounts = () => {
        setAccounts(RESET)
    }

    return { accounts, addAccount , resetAccounts }
}