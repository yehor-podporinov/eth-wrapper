import { Button, TextField } from '@mui/material'
import { utils } from 'ethers'
import { FormEvent, useCallback, useContext, useState } from 'react'
import { Web3Context } from '../contexts'
import { ether, maxEther, required } from '../helpers'
import { useFormValidation } from '../hooks'
import ProgressModal from './ProgressModal'

import styled from 'styled-components'

const StyledWrapper = styled.form`{
  display: grid;
  grid-gap: 8px;
}`

export default function WithdrawForm() {
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { balance, updateBalance, wEthContract } = useContext(Web3Context)

  const { getFieldErrorMessage, touchField, touchForm, isFieldsValid } =
    useFormValidation(
      { amount },
      {
        amount: {
          required,
          ether,
          ...(balance?.wEthAmount && {
            maxEther: maxEther(balance.wEthAmount)
          }),
        },
      },
    )

  const onSuccess = useCallback(async () => {
    try {
      if (!updateBalance) throw new Error('updateBalance func is unavailable')
      await updateBalance()
    } catch (error) {
      console.error(error)
    }
  }, [updateBalance])

  const onSubmit = useCallback(async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    touchForm()
    if (!isFieldsValid) return

    setIsSubmitting(true)

    try {
      if (!wEthContract?.signerBased || !wEthContract?.providerBased)
        throw new Error('Contract unavailable')

      const decimals = await wEthContract.providerBased.decimals()
      const tx = await wEthContract.signerBased.withdraw(utils.parseUnits(amount, decimals))

      await tx.wait()
    } catch (error) {
      console.error(error)
    }

    setIsSubmitting(false)

    await onSuccess()
  }, [amount, wEthContract])

  return (
    <StyledWrapper onSubmit={onSubmit}>
      <TextField
        value={amount}
        placeholder="Enter amount"
        error={!!getFieldErrorMessage('amount')}
        helperText={getFieldErrorMessage('amount')}
        disabled={isSubmitting}
        onBlur={() => touchField('amount')}
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
