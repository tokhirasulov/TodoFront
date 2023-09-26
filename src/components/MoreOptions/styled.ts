import styled, { css } from 'styled-components'
import { StatusProps } from '.'
import { device } from '../../shared/utils'

export const Wrapper = styled.div`
  position: relative;
  & > .dots {
    cursor: pointer;
  }
`

export const Container = styled.div<StatusProps>`
  padding: 12px;
  position: absolute;
  bottom: -46px;
  right: 0;
  background-color: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  transition: ease-in-out 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 80px;
  @media ${device.tablet} {
    padding: 4px;
    bottom: -30px;
    gap: 10px;
  }
  & > .edit,
  & > .delete {
    display: flex;
    gap: 20px;
    font-size: 14px;
    cursor: pointer;
    @media ${device.mobileL} {
      font-size: 12px;
    }
  }

  ${(props) =>
    props.status === 'completed' &&
    css`
      & > .edit {
        display: none;
      }

      bottom: 0;
    `}

  & > .delete {
    color: #dc2626;
  }
`
