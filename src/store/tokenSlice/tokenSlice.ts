import { StateCreator } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';

interface IPayload {
  [k: string]: string;
}

export interface ITokenStoreState {
  error: string;
  token: string;
  loading: boolean;
  auth: (payload: IPayload) => Promise<{ error: string | null }>;
  clear: () => void;
}

const getDefaultInitialState = () => ({
  error: '',
  token: '',
  loading: false
});

export const createTokenSlice: StateCreator<ITokenStoreState> = (set) => ({
  ...getDefaultInitialState(),
  clear: () => {},
  auth: async (payload: IPayload) => {
    set((state) => ({ ...state, loading: true }));
    const { data } = await axios.post(`${BASE_URL}/${EApiRoutes.login}`, payload);
    set((state) => ({ ...state, loading: false }));

    if (!data.error) {
      set((state) => ({ ...state, token: data.payload.token }));

      const date = new Date(Date.now() + 86400e3);
      document.cookie = `token=${data.payload.token}; expires=${date.toUTCString()}`;
    } else {
      set((state) => ({ ...state, error: data.error }));
    }

    return data;
  }
});
