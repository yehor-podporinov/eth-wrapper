import { Typography, Link } from '@mui/material'
import { config } from '../config'

import styled from 'styled-components'

const StyledWrapper = styled.footer`{
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 16px;
}`

export default function AppFooter() {
  return (
    <StyledWrapper>
      <Typography color="text.primary">LICENSE: MIT</Typography>
      <Link
        href={config.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        color="text.primary"
        variant="body1"
      >
        GitHub
      </Link>
    </StyledWrapper>
  )
}
