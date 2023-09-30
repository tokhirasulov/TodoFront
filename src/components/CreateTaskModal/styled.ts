import styled from 'styled-components'
import { colors } from '../../shared/colors'

export const ModalWrapper = styled.div`
  width: 110%;
  position: fixed;
  top: -50px;
  left: -20px;
  background-color: rgba(0, 0, 0, 0.5);
  height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

export const Modal = styled.div`
  background-color: ${colors.white};
  width: 30%;
  padding: 40px;
  border-radius: 8px;

  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 550px) {
    width: 70%;
  }

  & > .create-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  & > div > div > .Date {
    display: flex;
    justify-content: space-between;
  }

  & > .create-input {
    border: 1px solid #cbd5e1;
    padding: 14px 16px;
    border-radius: 4px;
    font-family: Inter;
    resize: none;
  }

  & > .lowerSection {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
  }

  & > .lowerSection > .charNum {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.25);
    text-align: right;
    position: absolute;
    right: 0;
    top: 1px;
  }
`
