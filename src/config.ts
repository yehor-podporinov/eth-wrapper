import { type Web3ModalOptions, defaultConfig } from '@web3modal/ethers5/react'
import { providers } from 'ethers'

type Config = {
  githubUrl: string
  staticProvider: providers.StaticJsonRpcProvider
  web3ModalOptions: Web3ModalOptions
  chainId: number
  wEthContractAddress: string
}

export const config = Object.freeze<Config>({
  githubUrl: process.env.REACT_APP_GITHUB_URL as string,
  staticProvider: new providers.StaticJsonRpcProvider(process.env.REACT_APP_CHAIN_RPC_URL),
  web3ModalOptions: {
    ethersConfig: defaultConfig({
      metadata: {
        name: process.env.REACT_APP_NAME as string,
        description: process.env.REACT_APP_DESCRIPTION as string,
        url: process.env.REACT_APP_URL as string,
        icons: [process.env.REACT_APP_URL as string],
      },
    }),
    chains: [
      {
        chainId: Number(process.env.REACT_APP_CHAIN_ID),
        name: process.env.REACT_APP_CHAIN_NAME as string,
        currency: process.env.REACT_APP_CHAIN_CURRENCY as string,
        explorerUrl: process.env.REACT_APP_CHAIN_EXPLORER_URL as string,
        rpcUrl: process.env.REACT_APP_CHAIN_RPC_URL as string,
      },
    ],
    projectId: process.env.REACT_APP_W3M_PROJECT_ID as string,
  },
  chainId: Number(process.env.REACT_APP_CHAIN_ID),
  wEthContractAddress: process.env.REACT_APP_WETH_CONTRACT_ADDRESS as string,
})
