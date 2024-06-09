import type { Balance, Contract, Provider, Wallet } from '../types'

import { createContext } from 'react'

export interface IWeb3Context {
  balance: Balance | null
  provider: Provider | null
  wallet: Wallet | null
  wEthContract: Contract<'WETHContract__factory'> | null
}

export const Web3Context = createContext<IWeb3Context>({
  balance: null,
  provider: null,
  wallet: null,
  wEthContract: null,
})
