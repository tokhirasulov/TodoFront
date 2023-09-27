import * as Style from './styled'

export interface ButtonProps {
  innerText?: string
  backgroundColor: string
  width?: string
  style?: {}
  type?: string
  onClick?: Function
  color?: string
  disable?: boolean
}

export const ButtonPrimary = ({
  disable,
  innerText,
  backgroundColor,
  width,
  style,
  type,
  onClick,
  color,
}: ButtonProps) => {
  console.log(disable)
  return (
    <Style.ButtonPrimary
      type={type}
      style={style}
      backgroundColor={backgroundColor}
      width={width}
      onClick={onClick}
      color={color}
      disabled={disable}
    >
      {innerText}
    </Style.ButtonPrimary>
  )
}
