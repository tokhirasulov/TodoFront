import * as Style from './styled'

export interface ButtonProps {
  innerText?: string
  backgroundColor: string
  width?: string
  style?: {}
  type?: string
  onClick?: Function
  color?: string
}

export const ButtonPrimary = ({
  innerText,
  backgroundColor,
  width,
  style,
  type,
  onClick,
  color
}: ButtonProps) => {
  return (
    <Style.ButtonPrimary
      type={type}
      style={style}
      backgroundColor={backgroundColor}
      width={width}
      onClick={onClick}
      color={color}
    >
      {innerText}
    </Style.ButtonPrimary>
  )
}
