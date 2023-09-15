import { ICurrency } from '../../types/interfaces/ICurrency';
import { StateCreator } from 'zustand';
import axios from 'axios';
import { BASE_URL, SOCKET_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';
import { ICurrencyFeed } from '../../types/interfaces/ICurrencyFeed';

export interface ICurrencyState {
  currenciesState: {
    loading: boolean;
    error: string;
  };
  currencies: Array<ICurrency>;
  currenciesFeed: Array<ICurrencyFeed>;
  bankCurrencies: Array<string>;
  fetchCurrency: (token: string) => void;
  fetchBankCurrencies: () => void;
  buyCurrency: (token: string, formData: { [k: string]: string }) => void;
  getCurrenciesFeed: () => void;
}

export const createCurrencySlice: StateCreator<ICurrencyState> = (set) => ({
  currencies: [],
  currenciesFeed: [],
  currenciesState: {
    error: '',
    loading: false
  },
  bankCurrencies: [],
  fetchCurrency: async (token: string) => {
    try {
      set((state) => ({ ...state, currenciesState: { ...state.currenciesState, loading: true } }));
      const { data } = await axios.get(`${BASE_URL}/${EApiRoutes.currencies}`, {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      set((state) => ({ ...state, currenciesState: { ...state.currenciesState, loading: false } }));

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.error) {
        set((state) => ({ ...state, currencies: Object.values(data.payload) }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        currenciesState: { ...state.currenciesState, error: (error as Error).message }
      }));
    }
  },
  fetchBankCurrencies: async () => {
    try {
      set((state) => ({ ...state, currenciesState: { ...state.currenciesState, loading: true } }));
      const { data } = await axios.get(`${BASE_URL}/${EApiRoutes.allCurrencies}`);
      set((state) => ({ ...state, currenciesState: { ...state.currenciesState, loading: false } }));

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.error) {
        set((state) => ({ ...state, bankCurrencies: data.payload }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        currenciesState: { ...state.currenciesState, error: (error as Error).message }
      }));
    }
  },
  buyCurrency: async (token: string, formData: { [k: string]: string }) => {
    try {
      set((state) => ({ ...state, currenciesState: { ...state.currenciesState, loading: true } }));
      set((state) => ({ ...state, currenciesState: { ...state.currenciesState, error: '' } }));
      const { data } = await axios.post(
        `${BASE_URL}/${EApiRoutes.buyCurrency}`,
        { ...formData },
        {
          headers: {
            Authorization: `Basic ${token}`
          }
        }
      );
      set((state) => ({ ...state, currenciesState: { ...state.currenciesState, loading: false } }));

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.error) {
        set((state) => ({ ...state, currencies: Object.values(data.payload) }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        currenciesState: { ...state.currenciesState, error: (error as Error).message }
      }));
    }
  },
  getCurrenciesFeed: async () => {
    const socket = new WebSocket(`${SOCKET_URL}/${EApiRoutes.currenciesFeed}`);
    const tempFeed: Array<ICurrencyFeed> = [];

    socket.onmessage = (event) => {
      if (tempFeed.length < 21) {
        tempFeed.unshift(JSON.parse(event.data));
      } else {
        tempFeed.pop();
        tempFeed.unshift(JSON.parse(event.data));
      }

      set((state) => ({ ...state, currenciesFeed: tempFeed }));
    };
  }
});
