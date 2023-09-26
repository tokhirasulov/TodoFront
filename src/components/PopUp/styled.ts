import { colors } from '../../shared/colors'
import styled from 'styled-components'
import { device } from '../../shared/utils'

export const ModalWrapper = styled.div`
  width: 110%;
  position: fixed;
  top: -50px;
  left: -50px;
  background-color: rgba(0, 0, 0, 0.5);
  height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media (max-width: 550px) {
    left: -20px;
  }
`

export const Modal = styled.div`
  background-color: ${colors.white};
  width: 382px;
  border-radius: 8px;

  @media (max-width: 550px) {
    width: 80%;
  }
`
export const Main = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  @media ${device.mobileL} {
    padding: 12px;
    width: 80%;
  }

  & > .image_bg {
    padding: 14px;
    border-radius: 50%;
    background-color: #fee2e2;
    display: flex;
    margin-bottom: 20px;
    @media ${device.mobileL} {
      padding: 10px;
    }
  }

  & > .text {
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media ${device.mobileL} {
      gap: 4px;
    }

    & > .title {
      font-size: 16px;
      @media ${device.mobileL} {
        font-size: 14px;
      }
    }

    & > .message {
      font-size: 14px;
      color: #64748b;
      @media ${device.mobileL} {
        font-size: 12px;
      }
    }
  }
`
export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #f8fafc;
  padding: 12px 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  gap: 24px;
`
