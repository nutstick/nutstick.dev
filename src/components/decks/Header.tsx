import React from 'react'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import Close from '../../img/close.svg'

const Container = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.39, 0.58, 0.57, 1);

  &:hover {
    opacity: 1;
  }
`

const CloseIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-left: 16px;
  margin-right: 16px;
  cursor: pointer;
`

const Title = styled.h3`
  padding-left: 24px;
  padding-right: 12px;
`

interface Props {
  title: string
}

const Header: React.FC<Props> = ({ title }) => (
  <Container>
    <Title>{title}</Title>
    <CloseIcon src={Close} alt="Close" onClick={() => navigate('/')} />
  </Container>
)

export default Header
