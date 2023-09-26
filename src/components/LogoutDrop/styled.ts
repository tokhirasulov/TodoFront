import styled from 'styled-components'
import { device } from '../../shared/utils'

export const Container = styled.div`
  padding: 12px;
  position: absolute;
  bottom: -46px;
  right: 15px;
  background-color: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  transition: ease-in-out 0.2s;
  width: 90px;
  cursor: pointer;
  @media ${device.mobileL} {
    width: 60%;
    bottom: -35px;
    right: 5px;
    padding: 8px;
  }
  &:hover {
    background-color: #f2f2f2;
  }

  & > .wrapper {
    display: flex;
    gap: 20px;
    @media ${device.mobileL} {
      gap: 10px;
    }
  }
`
