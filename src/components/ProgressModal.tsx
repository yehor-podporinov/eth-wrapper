import { Modal, CircularProgress } from '@mui/material'

import styled from 'styled-components'

type Props = {
  isShown: boolean
}

const StyledWrapper = styled(Modal)`{
  display: flex;
  
  .progress-modal__progress {
    margin: auto;
  }
}`

export default function ProgressModal({ isShown, ...rest }: Props) {
  return (
    <StyledWrapper open={isShown} {...rest}>
      <CircularProgress className="progress-modal__progress" />
    </StyledWrapper>
  )
}
