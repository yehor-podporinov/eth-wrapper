import {
  useDisconnect,
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers5/react'
import { useMemo } from 'react'
import { Wallet } from '../types'

export function useWallet(): Wallet {
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useSwitchNetwork()
  const { open } = useWeb3Modal()
  const { address: _address, chainId: _chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const address: Wallet['address'] = useMemo(() => _address || '', [_address])
  const provider: Wallet['provider'] = useMemo(() => walletProvider || null, [walletProvider])
  const chainId: Wallet['chainId'] = useMemo(() => _chainId || -1, [_chainId])

  const connect = async () => {
    await open()
  }

  const selectChain: Wallet['selectChain'] = async (id: number) => {
    if (chainId === id) return
    await switchNetwork(id)
  }

  return {
    address,
    provider,
    isConnected,
    chainId,
    connect,
    disconnect,
    selectChain,
  }
}
