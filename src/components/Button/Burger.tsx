import React from 'react'
import styled from '@emotion/styled/macro'

export const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }
`

const Svg = styled.svg`
  height: 50px;
  width: 50px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .line {
    fill: none;
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
    stroke: #000;
    stroke-width: 2.5;
    stroke-linecap: round;
  }

  .top {
    stroke-dasharray: 40 139;
  }

  .bottom {
    stroke-dasharray: 40 180;
  }

  ${({ open }: any) =>
    open &&
    `
    transform: rotate(45deg);

    .top {
      stroke-dashoffset: -98px;
    }

    .bottom {
      stroke-dashoffset: -138px;
    }
  `};
`

type BurgerProps = {
  width?: string
  height?: string
  open?: boolean
}

const BurgerIcon = (props: BurgerProps) => (
  <Svg viewBox='0 0 100 100' width='80' {...props}>
    <path
      className='line top'
      d='m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40'
    />
    <path className='line middle' d='m 30,50 h 40' />
    <path
      className='line bottom'
      d='m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40'
    />
  </Svg>
)

export default function Burger({ isOpen, ...rest }: any) {
  return (
    <StyledButton {...rest}>
      <BurgerIcon open={isOpen} />
    </StyledButton>
  )
}
