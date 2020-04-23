import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

// TODO: need to see what embark returns for these values

export interface ERC20Token {
  address: string,
  allowance: number, // Always towards the SNT contract
  balance: number, // Always of the current user
  decimals: number,
  logo: string,
  name: string,
  symbol: string,
}

export interface SNTPrice {
  price: number
}

export interface DAppsToken extends ERC20Token, KyberERC20Token, SNTPrice {}

/* --- STATE --- */
interface TokensState {
  readonly tokens: DAppsToken[];
}

/* --- ACTIONS --- */
type TokensActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type DomainState = TokensState;
type DomainActions = TokensActions;

export { RootState, DomainState, DomainActions };
