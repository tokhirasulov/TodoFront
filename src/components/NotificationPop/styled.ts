import styled from 'styled-components'
import { colors } from '../../shared/colors'
import { device } from '../../shared/utils'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  top: 10px;
  left: 40%;
  right: 40%;
  padding: 12px;
  font-size: 'Inter';
  border-radius: 8px;
  background-color: ${colors.white};
  box-shadow: 0px 6px 13px -5px rgba(0, 0, 0, 0.56);
  -webkit-box-shadow: 0px 6px 13px -5px rgba(0, 0, 0, 0.56);
  -moz-box-shadow: 0px 6px 13px -5px rgba(0, 0, 0, 0.56);
  font-size: 15px;

  & > h5 {
    font-weight: 400;
  }

  @media ${device.laptop} {
    left: 30%;
    right: 30%;
  }
  @media ${device.tablet} {
    left: 20%;
    right: 20%;
  }
  @media (max-width: 500px) {
    width: 200px;
    font-size: 14px;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;

  & > button {
    padding: 4px 6px !important;
  }
`
