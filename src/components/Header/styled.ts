import { styled } from 'styled-components'
import { colors } from '../../shared/colors'
import { device } from '../../shared/utils'

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 50px;

  @media ${device.tablet} {
    margin-bottom: 24px;
  }
  @media ${device.mobileL} {
    margin-bottom: 12px;
  }

  & > h1 {
    font-size: 33px;
    font-weight: 600;
    @media ${device.tablet} {
      font-size: 24px;
    }
    @media ${device.mobileL} {
      font-size: 16px;
    }
  }

  & > p {
    font-size: 16px;
    font-weight: 400;
    color: #475569;
    @media ${device.tablet} {
      font-size: 14px;
    }
    @media ${device.mobileL} {
      font-size: 10px;
    }
  }

  & > p > strong {
    color: ${colors.primary};
    cursor: pointer;
  }
`
