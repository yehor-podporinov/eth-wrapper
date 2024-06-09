import type { BigNumberish, providers } from 'ethers'
import type { factories } from './contracts'

type ContractFactoryKey = keyof typeof factories
type ContractFactoryClass<FK extends ContractFactoryKey> =
  (typeof factories)[FK]

type ContractInstance<FK extends ContractFactoryKey> = ReturnType<
  ContractFactoryClass<FK>['connect']
>

type ContractInterface<FK extends ContractFactoryKey> =
  ReturnType<ContractFactoryClass<FK>['createInterface']>

export type Contract<K extends ContractFactoryKey> = {
  iface: ContractInterface<K>
  providerBased: ContractInstance<K>
  signerBased: ContractInstance<K>
}

export type Balance = {
  ethAmount: BigNumberish | null
  wEthAmount: BigNumberish | null
}

export type Wallet = {
  address: string
  provider: providers.ExternalProvider | null
  chainId: number,
  isConnected: boolean,
  connect: () => Promise<void>,
  disconnect: () => Promise<void>,
  selectChain: (id: number) => Promise<void>
}

export type Provider = providers.StaticJsonRpcProvider | providers.Web3Provider
