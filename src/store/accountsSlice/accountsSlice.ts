import { IAccount } from '../../types/interfaces/IAccount';
import { StateCreator } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';

export interface IAccountsState {
  accountsState: {
    error: string;
    loading: boolean;
  };
  accounts: Array<IAccount>;
  fetchAccounts: (token: string) => void;
  sortingAccounts: (sortType: string) => void;
}

export const createAccountsSlice: StateCreator<IAccountsState> = (set) => ({
  accountsState: {
    error: '',
    loading: false
  },
  accounts: [],
  fetchAccounts: async (token: string) => {
    set((state) => ({ ...state, accountsState: { ...state.accountsState, loading: true } }));
    const { data } = await axios.get(`${BASE_URL}/${EApiRoutes.accounts}`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    });
    set((state) => ({ ...state, accountsState: { ...state.accountsState, loading: false } }));

    if (!data.error) {
      set((state) => ({ ...state, accounts: data.payload }));
    } else {
      set((state) => ({ ...state, accountsState: { ...state.accountsState, error: data.error } }));
    }
  },
  sortingAccounts: (sortType: string) => {
    switch (sortType) {
      case '0':
        set((state) => ({
          ...state,
          accounts: state.accounts.sort((a, b) => Number(a.account) - Number(b.account))
        }));
        break;
      case '1':
        set((state) => ({
          ...state,
          accounts: state.accounts.sort((a, b) => a.balance - b.balance)
        }));
        break;
      case '2':
        set((state) => ({
          ...state,
          accounts: state.accounts.sort(
            (a, b) =>
              new Date(b.transactions[0]?.date).getTime() -
              new Date(a.transactions[0]?.date).getTime()
          )
        }));
        break;
      default:
        break;
    }
  }
});
