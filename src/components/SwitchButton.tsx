import { Button, type ButtonProps } from '@mui/material'
import { config } from '../config'
import { Web3Context } from '../contexts'
import { useCallback, useContext } from 'react'

export default function SwitchButton(props: ButtonProps) {
  const { wallet } = useContext(Web3Context)

  const onClick = useCallback(async () => {
    try {
      if (!wallet) throw new Error('Wallet unavailable')
      await wallet.selectChain(config.chainId)
    } catch (error) {
      console.error(error)
    }
  }, [wallet])

  return (
    <Button {...props} onClick={onClick}>
      Switch network
    </Button>
  )
}
