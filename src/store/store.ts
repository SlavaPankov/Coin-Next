import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createTokenSlice, ITokenStoreState } from './tokenSlice/tokenSlice';

type StoreState = ITokenStoreState;

export const useAppStore = create<StoreState>()(
  persist(
    (...arg) => ({
      ...createTokenSlice(...arg)
    }),
    {
      name: 'storage'
    }
  )
);
