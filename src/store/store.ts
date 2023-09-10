import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createTokenSlice, ITokenStoreState } from './tokenSlice/tokenSlice';
import { createAccountsSlice, IAccountsState } from './accountsSlice/accountsSlice';

type StoreState = ITokenStoreState & IAccountsState;

export const useAppStore = create<StoreState>()(
  persist(
    (...arg) => ({
      ...createTokenSlice(...arg),
      ...createAccountsSlice(...arg)
    }),
    {
      name: 'storage'
    }
  )
);
