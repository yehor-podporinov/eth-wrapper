import { Web3Context } from '../contexts'
import { Typography } from '@mui/material'
import { utils } from 'ethers'
import { useContext, useMemo } from 'react'

import styled from 'styled-components'

const StyledWrapper = styled.div`{
  display: grid;
  grid-gap: 8px;
}`

export default function WalletBalance() {
  const { balance } = useContext(Web3Context)

  const indicators = useMemo(() => [
    {
      title: 'ETH',
      value: balance?.ethAmount ? utils.formatEther(balance.ethAmount) : '',
    },
    {
      title: 'WETH',
      value: balance?.wEthAmount ? utils.formatEther(balance.wEthAmount) : '',
    },
  ], [balance])

  return (
    <StyledWrapper>
      {indicators.map((indicator, idx) =>
        <Typography
          key={idx}
          variant="h6"
          component="p"
          color="text.primary"
          textAlign="left"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {`${indicator.title}: ${indicator.value}`}
        </Typography>
      )}
    </StyledWrapper>
  )
}
