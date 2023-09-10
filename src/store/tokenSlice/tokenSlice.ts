import { StateCreator } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';

interface IPayload {
  [k: string]: string;
}

export interface ITokenStoreState {
  tokenState: {
    error: string;
    loading: boolean;
  };
  token: string;
  auth: (payload: IPayload) => Promise<{ error: string | null }>;
  clear: () => void;
}

export const createTokenSlice: StateCreator<ITokenStoreState> = (set) => {
  return {
    token: '',
    tokenState: {
      error: '',
      loading: false
    },
    clear: () => {},
    auth: async (payload: IPayload) => {
      set((state) => ({ ...state, tokenState: { ...state.tokenState, loading: true } }));
      const { data } = await axios.post(`${BASE_URL}/${EApiRoutes.login}`, payload);
      set((state) => ({ ...state, tokenState: { ...state.tokenState, loading: true } }));

      if (!data.error) {
        set((state) => ({ ...state, token: data.payload.token }));

        const date = new Date(Date.now() + 86400e3);
        document.cookie = `token=${data.payload.token}; expires=${date.toUTCString()}`;
      } else {
        set((state) => ({ ...state, tokenState: { ...state.tokenState, error: data.error } }));
      }

      return data;
    }
  };
};
