import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';

interface IPayload {
  [k: string]: string;
}

interface ITokenStoreState {
  error: string;
  token: string;
  loading: boolean;
  auth: (payload: IPayload) => Promise<{ error: string | null }>;
}

export const useTokenStore = create<ITokenStoreState>()((set) => ({
  error: '',
  loading: false,
  token: '',
  auth: async (payload: IPayload) => {
    set((state) => ({ ...state, loading: true }));
    const { data } = await axios.post(`${BASE_URL}/${EApiRoutes.login}`, payload);
    set((state) => ({ ...state, loading: false }));

    if (!data.error) {
      set((state) => ({ ...state, token: data.payload.token }));
    } else {
      set((state) => ({ ...state, error: data.error }));
    }

    return data;
  }
}));
