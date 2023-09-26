import { styled } from 'styled-components'
import { colors } from '../../../shared/colors'
import { device } from '../../../shared/utils'

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;

  & > .img-container {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #b4c2f3;
    height: 100%;
    @media (max-width: 850px) {
      display: none;
    }
    & > img {
      width: 100%;
    }
  }
`

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-self: center;
  width: 100%;

  & > .register-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 400px;
    @media ${device.mobileL} {
      width: 80%;
    }
  }

  & > .register-form > label {
    font-size: 14px;
    font-weight: 400;
    color: #475569;
  }
`
export const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 64px;
  @media ${device.mobileL} {
    margin-bottom: 24px;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  & > .reg-input {
    border: 1px solid #cbd5e1;
    padding: 14px 16px;
    border-radius: 4px;
  }

  & > .passwordWrapper {
    position: relative;
  }

  & > .passwordWrapper > .reg-input {
    border: 1px solid #cbd5e1;
    padding: 14px 16px;
    border-radius: 4px;
    width: 91%;
    @media (max-width: 350px) {
      padding: 14px 8px 14px 16px;
    }
  }
  & > .passwordWrapper > .eyePassword {
    position: absolute;
    width: 20px;
    top: 10px;
    right: 30px;
  }
`

export const LoginWrapper = styled.div`
  width: 400px;
  margin-top: 16px;
  @media ${device.mobileL} {
    width: 80%;
  }
`
