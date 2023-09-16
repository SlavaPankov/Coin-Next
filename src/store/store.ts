import { create } from 'zustand';
import { createTokenSlice, ITokenStoreState } from './tokenSlice/tokenSlice';
import { createAccountsSlice, IAccountsState } from './accountsSlice/accountsSlice';
import { createAccountSlice, IAccountState } from './accountSlice/accountSlice';
import { createCurrencySlice, ICurrencyState } from './currencySlice/currencySlice';
import { createBanksSlice, IBanksState } from './banksSlice/banksSlice';

type StoreState = ITokenStoreState & IAccountsState & IAccountState & ICurrencyState & IBanksState;

export const useAppStore = create<StoreState>()((...arg) => ({
  ...createTokenSlice(...arg),
  ...createAccountsSlice(...arg),
  ...createAccountSlice(...arg),
  ...createCurrencySlice(...arg),
  ...createBanksSlice(...arg)
}));
