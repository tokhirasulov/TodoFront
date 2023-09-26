import * as Style from './styled'

interface HeadProps{
    handleClick: () => void
}
export const Header = ({handleClick}:HeadProps) => {
    return(
        <Style.Header>
            <h1>Daily Task</h1>
            <p>Click <strong onClick={handleClick}>+New</strong> to create new task and kickstart your productivity</p>
        </Style.Header>
    )
}