import { createWeb3Modal } from '@web3modal/ethers5/react'
import { providers } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useContract, useWallet } from './hooks'
import { type IWeb3Context, Web3Context } from './contexts'
import { config } from './config'
import './styles/app.scss'

import { ThemeProvider, createTheme } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  ConnectButton,
  DisconnectButton,
  SwitchButton,
  WalletBalance,
  DepositForm,
  WithdrawForm
} from './components'

import styled from 'styled-components'

const StyledWrapper = styled.div`{
  display: flex;
  flex: 1;
  
  .app__content {
    margin: auto;
    display: grid;
    grid-gap: 32px;
    padding: 8px;
    width: 100%;
    max-width: 300px;
  }
}`

const darkTheme = createTheme({
  palette: { mode: 'dark' },
})

function App() {
  createWeb3Modal(config.web3ModalOptions)

  const [balance, setBalance] = useState<IWeb3Context['balance']>(null)

  const wallet = useWallet()

  const provider = useMemo(() => {
    if (wallet.provider && wallet.chainId === config.web3ModalOptions.chains[0].chainId) {
      return new providers.Web3Provider(wallet.provider)
    }

    return config.staticProvider
  }, [wallet.provider, wallet.chainId])

  const wEthContract = useContract(
    'WETHContract__factory',
    config.wEthContractAddress,
    provider
  )

  const updateBalance = useCallback(async (): Promise<void> => {
    if (!wallet.address) throw new Error('User\'s address unavailable')

    const [ethAmount, wEthAmount] = await Promise.all([
      provider.getBalance(wallet.address),
      wEthContract.providerBased.balanceOf(wallet.address),
    ])

    setBalance({ ethAmount, wEthAmount })
  }, [wallet.address, provider, wEthContract.providerBased])

  const onAddressChange = useCallback(async (): Promise<void> => {
    try {
     await updateBalance()
    } catch (error) {
      console.log(error)
    }
  }, [updateBalance])

  useEffect(() => {
    if (!wallet.address) return
    onAddressChange()
  }, [wallet.address])

  const childComponent = useMemo(() => {
    switch (true) {
      case !wallet.isConnected:
        return <ConnectButton variant="contained" />
      case wallet.chainId !== config.chainId:
        return (<>
          <SwitchButton variant="contained" />
          <DisconnectButton />
        </>)
      default:
        return (<>
          <WalletBalance />
          <DepositForm />
          <WithdrawForm />
          <DisconnectButton />
        </>)
    }
  }, [wallet.chainId, wallet.isConnected])

  return (
    <Web3Context.Provider value={{ balance, provider, wEthContract, wallet, updateBalance }}>
      <ThemeProvider theme={darkTheme}>
        <StyledWrapper className="App">
          <main className="app__content">
            {childComponent}
          </main>
        </StyledWrapper>
      </ThemeProvider>
    </Web3Context.Provider>
  );
}

export default App;
