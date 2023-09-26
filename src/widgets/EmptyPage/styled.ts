import styled from 'styled-components'
import { device } from '../../shared/utils'

export const EmptyList = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  @media ${device.mobileL} {
    gap: 10px;
  }

  & > .text {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    @media ${device.mobileL} {
      & > h3 {
        font-size: 14px;
      }
      & > p {
        font-size: 12px;
      }
    }
  }
`
