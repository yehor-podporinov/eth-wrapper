import { Web3Context } from '../contexts'
import { Button, TextField } from '@mui/material'
import { utils } from 'ethers'
import { FormEvent, useCallback, useContext, useState } from 'react'
import ProgressModal from './ProgressModal'

import styled from 'styled-components'

const StyledWrapper = styled.form`{
  display: grid;
  grid-gap: 8px;
}`

export default function WithdrawForm() {
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { wEthContract } = useContext(Web3Context)

  const onSubmit = useCallback(async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      if (!wEthContract?.signerBased || !wEthContract?.providerBased)
        throw new Error('Contract unavailable')

      const decimals = await wEthContract.providerBased.decimals()
      const tx = await wEthContract.signerBased.withdraw(utils.parseUnits(amount, decimals))

      await tx.wait()
    } catch (error) {
      console.log(error)
    }

    setIsSubmitting(false)
  }, [amount, wEthContract])

  return (
    <StyledWrapper onSubmit={onSubmit}>
      <TextField
        value={amount}
        placeholder="Enter amount"
        disabled={isSubmitting}
        onChange={event => setAmount(event.target.value)}
      />
      <Button
        variant="outlined"
        type="submit"
        disabled={isSubmitting}
      >
        Unwrap
      </Button>
      <ProgressModal isShown={isSubmitting} />
    </StyledWrapper>
  )
}
