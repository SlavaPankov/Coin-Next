import { ICurrency } from '../../types/interfaces/ICurrency';
import { StateCreator } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';

export interface ICurrencyState {
  currencies: Array<ICurrency>;
  bankCurrencies: Array<string>;
  fetchCurrency: (token: string) => void;
  fetchBankCurrencies: () => void;
}

export const createCurrencySlice: StateCreator<ICurrencyState> = (set) => ({
  currencies: [],
  bankCurrencies: [],
  fetchCurrency: async (token: string) => {
    const { data } = await axios.get(`${BASE_URL}/${EApiRoutes.currencies}`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    });

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.error) {
      set((state) => ({ ...state, currencies: Object.values(data.payload) }));
    }
  },
  fetchBankCurrencies: async () => {
    const { data } = await axios.get(`${BASE_URL}/${EApiRoutes.allCurrencies}`);

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.error) {
      set((state) => ({ ...state, bankCurrencies: data.payload }));
    }
  }
});
