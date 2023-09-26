import { styled } from 'styled-components'
import { colors } from '../../shared/colors'
import { device } from '../../shared/utils'

export const Wrapper = styled.div`
  width: 100vw;
  background-color: #f8fafc;
`

export const TaskWrapper = styled.div`
  background-color: #f8fafc;
  max-width: 1440px;
  margin: 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const MainContent = styled.div`
  padding: 48px 246px;

  @media (max-width: 1150px) {
    padding: 48px 100px;
  }

  @media ${device.laptop} {
    padding: 24px;
  }
`

export const Progress = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  @media (max-width: 565px) {
    overflow-x: scroll;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  & > div > .buttonWrapper {
    margin-top: 40px;
  }
`
