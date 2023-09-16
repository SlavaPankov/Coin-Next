import { StateCreator } from 'zustand';
import { IBank } from '../../types/interfaces/IBank';
import axios from 'axios';
import { BASE_URL } from '../../cfg/apiConfig';
import { EApiRoutes } from '../../types/enums/EApiRoutes';

export interface IBanksState {
  banks: Array<IBank>;
  banksState: {
    error: string;
  };
  fetchBanks: () => void;
}

export const createBanksSlice: StateCreator<IBanksState> = (set) => ({
  banks: [],
  banksState: {
    error: ''
  },
  fetchBanks: async () => {
    try {
      set((state) => ({
        ...state,
        banksState: { ...state.banksState, error: '' }
      }));

      const { data } = await axios.get(`${BASE_URL}/${EApiRoutes.banks}`);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.error) {
        set((state) => ({ ...state, banks: data.payload }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        banksState: { ...state.banksState, error: (error as Error).message }
      }));
    }
  }
});
