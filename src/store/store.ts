import { create } from 'zustand';
import { createTokenSlice, ITokenStoreState } from './tokenSlice/tokenSlice';
import { createAccountsSlice, IAccountsState } from './accountsSlice/accountsSlice';
import { createAccountSlice, IAccountState } from './accountSlice/accountSlice';

type StoreState = ITokenStoreState & IAccountsState & IAccountState;

export const useAppStore = create<StoreState>()((...arg) => ({
  ...createTokenSlice(...arg),
  ...createAccountsSlice(...arg),
  ...createAccountSlice(...arg)
}));
