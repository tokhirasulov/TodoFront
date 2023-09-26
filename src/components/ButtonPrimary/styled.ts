import { styled, css } from 'styled-components'
import { colors } from '../../shared/colors'
import { ButtonProps } from '.'

export const ButtonPrimary = styled.button<ButtonProps>`
  padding: 8px 0;
  border: none;
  border-radius: 5px;
  color: ${colors.white};
  font-weight: 600;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};

  ${(props) =>
    props.backgroundColor === colors.white &&
    css`
      color: ${colors.primary} !important;
      border: 1px solid ${colors.primary};
    `}
  ${(props) =>
    props.color &&
    css`
      color: ${props.color} !important;
    `}
`
