import { Button, type ButtonProps } from '@mui/material'
import { Web3Context } from '../contexts'
import { useCallback, useContext } from 'react'

export default function ConnectButton(props: ButtonProps) {
  const { wallet } = useContext(Web3Context)

  const onClick = useCallback(async () => {
    try {
      if (!wallet) throw new Error('Wallet unavailable')
      await wallet.connect()
    } catch (error) {
      console.log(error)
    }
  }, [wallet])

  return (
    <Button {...props} onClick={onClick}>
      Connect wallet
    </Button>
  )
}
