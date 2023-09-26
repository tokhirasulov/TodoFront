import * as Style from './styled'
import logoutIcon from '../../shared/assets/logout.svg'
import { useDispatch } from 'react-redux'
import { showLogoutPop } from '../../store/features/popUp'

interface IProps {
  show: boolean
}

export const Logout = ({ show }: IProps) => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(showLogoutPop())
  }
  return (
    <>
      {show && (
        <Style.Container onClick={logout}>
          <div className="wrapper">
            <p>Log out</p>
            <img src={logoutIcon} alt="click here to logout" />
          </div>
        </Style.Container>
      )}
    </>
  )
}
