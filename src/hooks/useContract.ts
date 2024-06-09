import { factories } from '../contracts'
import type  { Contract, Provider } from '../types'
import { useMemo } from 'react'

type ContractFactoryKey = keyof typeof factories

export function useContract<FK extends ContractFactoryKey>(
  contractFactoryKey: FK,
  contractAddress: string,
  provider: Provider,
): Contract<FK> {
  type I = Contract<FK>

  const _factoryClass = factories[contractFactoryKey]

  const iface: I['iface'] =
    _factoryClass.createInterface() as I['iface']

  const providerBased: I['providerBased'] = useMemo(() => {
    return _factoryClass.connect(
      contractAddress,
      provider,
    ) as I['providerBased']
  }, [contractAddress, provider])

  const signerBased: I['signerBased'] = useMemo(() => {
    return _factoryClass.connect(
      contractAddress,
      provider.getSigner(),
    ) as I['signerBased']
  }, [contractAddress, provider])

  return { iface, providerBased, signerBased }
}
