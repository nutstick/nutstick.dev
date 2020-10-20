import React from 'react'
import styled from '../../styles/styled'

const Container = styled.div`
  width: 750px;
  max-width: 85%;
  max-height: 60%;
  background: #353535;
  font-size: 14px;
  font-family: 'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier,
    monospace;
  border-radius: 4px;
  padding: 75px 45px 35px;
  position: relative;
  box-sizing: border-box;

  &:before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #d9515d;
    box-shadow: 25px 0 0 #f4c025, 50px 0 0 #3ec930;
  }
`

const Terminal: React.FC<{ style: React.CSSProperties }> = ({
  style,
  children,
}) => {
  return <Container style={style}>{children}</Container>
}

export default Terminal
