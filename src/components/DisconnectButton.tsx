import { Button, type ButtonProps } from '@mui/material'
import { Web3Context } from '../contexts'
import { useCallback, useContext } from 'react'

export default function DisconnectButton(props: ButtonProps) {
  const { wallet } = useContext(Web3Context)

  const onClick = useCallback(async () => {
    try {
      if (!wallet) throw new Error('Wallet unavailable')
      await wallet.disconnect()
    } catch (error) {
      console.log(error)
    }
  }, [wallet])

  return (
    <Button {...props} onClick={onClick}>
      Disconnect wallet
    </Button>
  )
}
