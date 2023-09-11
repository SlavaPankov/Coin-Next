import { IAccount } from '../../types/interfaces/IAccount';
import { StateCreator } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';

export interface IAccountState {
  accountState: {
    error: string;
    loading: boolean;
  };
  account: IAccount;
  fetchAccount: (id: string, token: string) => void;
}

export const createAccountSlice: StateCreator<IAccountState> = (set) => ({
  account: {
    account: '',
    balance: 0,
    mine: true,
    transactions: []
  },
  accountState: {
    error: '',
    loading: false
  },
  fetchAccount: async (id: string, token: string) => {
    set((state) => ({ ...state, accountState: { ...state.accountState, loading: true } }));
    const { data } = await axios.get(`${BASE_URL}/${EApiRoutes.account}/${id}`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    });
    set((state) => ({ ...state, accountState: { ...state.accountState, loading: false } }));

    if (!data.error) {
      set((state) => ({ ...state, account: data.payload }));
    } else {
      set((state) => ({ ...state, accountState: { ...state.accountState, error: data.error } }));
    }
  }
});
