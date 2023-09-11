import { IAccount } from '../../types/interfaces/IAccount';
import { StateCreator } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';
import { ITransferData } from '../../types/interfaces/ITransferData';

export interface IAccountState {
  accountState: {
    error: string;
    loading: boolean;
  };
  account: IAccount;
  fetchAccount: (id: string, token: string) => void;
  transferFounds: (transferData: ITransferData, token: string) => Promise<{ error: string | null }>;
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
  },
  transferFounds: async (
    transferData: ITransferData,
    token: string
  ): Promise<{ error: string | null }> => {
    set((state) => ({ ...state, accountState: { ...state.accountState, error: '' } }));
    const { data } = await axios.post(
      `${BASE_URL}/${EApiRoutes.transfer}`,
      { ...transferData },
      {
        headers: {
          Authorization: `Basic ${token}`
        }
      }
    );

    if (!data.error) {
      set((state) => ({ ...state, account: data.payload }));
    } else {
      set((state) => ({ ...state, accountState: { ...state.accountState, error: data.error } }));
    }

    return data.error;
  }
});
