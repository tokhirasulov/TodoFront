import styled, { css } from 'styled-components'
import { colors } from '../../shared/colors'
import { device } from '../../shared/utils'

interface EstimationProps {
  status: string
}

export const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  & > .buttonWrapper {
    margin-top: 40px;
    width: 100%;
  }

  & > .tasks {
    height: 100%;
    max-width: 300px;
  }

  & > .tasks > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    @media ${device.mobileL} {
      gap: 4px;
    }

    & > .hide {
      display: none;
    }
  }

  & > .tasks > div > .emptySpace {
    height: 100%;
    width: 100%;
    border: 1px dashed ${colors.primary};
    border-radius: 5px;
    color: ${colors.primary};
    text-align: center;
    font-size: 26px;
    position: relative;

    & > .infoIcon {
      position: absolute;
      width: 7%;
      right: 3px;
      top: 3px;
      cursor: pointer;
    }
    & > .infoPop {
      font-size: 8px;
      color: ${colors.white};
      padding: 4px;
      background-color: #081952;
      position: absolute;
      top: -5px;
      right: 10px;
      border-radius: 2px;
      transition: 0.2s ease-in-out;
    }
    & > .hide {
      opacity: 0;
      transition: 0.2s ease-in-out;
    }
  }
`

export const Status = styled.div`
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f5f9;
  border: 8px;
  margin-bottom: 12px;
  gap: 24px;

  @media ${device.tablet} {
    padding: 8px 12px;
    margin-bottom: 0;
    & > h3 {
      font-size: 16px;
    }
  }
  @media ${device.mobileL} {
    & > h3 {
      font-size: 14px;
    }
  }

  & > .statusLength {
    background-color: #0f172a;
    padding: 7px 10px;
    border-radius: 6px;
    color: ${colors.white};

    @media ${device.tablet} {
      padding: 2px 6px;
    }
  }
`
export const Task = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  word-break: break-all;
  border-radius: 8px;
  border: 1px solid #e8edfb;
  box-shadow: 0px 5px 10px 0px rgba(6, 28, 89, 0.03);
  word-break: break-word;

  @media ${device.tablet} {
    padding: 12px;
    gap: 4px;
  }
  @media ${device.mobileL} {
    padding: 8px;
  }
  & > .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    position: relative;
    gap: 10px;
    @media ${device.tablet} {
      font-size: 14px;
    }
    @media ${device.mobileL} {
      font-size: 12px;
    }
  }

  & > .description {
    font-size: 14px;
    color: #64748b;
    line-height: 24px;
    @media ${device.tablet} {
      font-size: 12px;
      line-height: 16px;
    }
    @media ${device.mobileL} {
      font-size: 10px;
      line-height: 16px;
    }
  }
`

export const Estimation = styled.div<EstimationProps>`
  ${(props) =>
    props.status === 'in_progress' &&
    css`
      background-color: ${colors.primary};
    `}
  ${(props) =>
    props.status === 'backlog' &&
    css`
      background-color: #f59e0b;
    `}
    ${(props) =>
    props.status === 'completed' &&
    css`
      background-color: #059669;
    `}
  margin-top: 14px;
  border-radius: 4px;
  color: ${colors.white};
  font-size: 14px;
  font-weight: 400;
  display: flex;
  padding: 4px 12px;
  gap: 8px;
  width: 45%;
  min-width: 110px;
  @media ${device.tablet} {
    margin-top: 10px;
    font-size: 12px;
    min-width: 100px;
  }
  @media ${device.mobileL} {
    margin-top: 4px;
    font-size: 10px;
  }
`
