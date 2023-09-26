import { styled } from 'styled-components'
import { colors } from '../../shared/colors'
import { device } from '../../shared/utils'

export const Wrap = styled.div`
  width: 100vw;
  background-color: ${colors.white};
  border-bottom: 1px solid #e2e8f0;
`

export const NavWrapper = styled.div`
  margin: 0 auto;
  max-width: 1440px;
`

export const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-self: center;
  padding: 18px 246px;

  background-color: ${colors.white};
  @media (max-width: 1150px) {
    padding: 18px 100px;
  }
  @media ${device.laptop} {
    padding: 16px 24px;
  }

  @media ${device.mobileL} {
    padding: 4px 12px;
  }

  & > .profile > div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    @media ${device.mobileL} {
      font-size: 10px;
    }
    & > .triangle {
      transition: ease-in-out 0.3s;
    }

    & > .rotate {
      transform: rotate(-180deg);
    }
  }

  & > .profile > div > .username {
    font-weight: 600;
    @media ${device.mobileL} {
      font-size: 12px;
    }
  }

  & > .profile > div > .profilePic {
    background-color: ${colors.primary};
    border-radius: 50%;
    padding: 5px 10px;
  }

  & > .profile > div > .profilePic > p {
    font-size: 14px;
    font-weight: 400;
    color: ${colors.white};
  }
`
