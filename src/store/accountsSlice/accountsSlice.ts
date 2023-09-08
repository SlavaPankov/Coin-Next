import { IAccount } from '../../types/interfaces/IAccount';
import { StateCreator } from 'zustand';

export interface IAccountsState {
  accounts: {
    loading: boolean;
    error: string;
    accounts: Array<IAccount>;
    fetchAccounts: () => void;
  };
}

export const createAccountsSlice: StateCreator<IAccountsState> = (set) => ({
  accounts: {
    error: '',
    loading: false,
    accounts: [],
    fetchAccounts: async () => {
      set((state) => ({ ...state, accounts: { ...state.accounts, loading: true } }));
    }
  }
});
