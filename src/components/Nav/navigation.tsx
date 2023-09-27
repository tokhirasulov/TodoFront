import logo_ill from '../../shared/assets/logo.svg'
import triangle from '../../shared/assets/drop.svg'
import * as Style from './styled'
import { Logout } from '../LogoutDrop'
import { useState } from 'react'
// @ts-ignore
import OutsideClickHandler from 'react-outside-click-handler'

export const Nav = () => {
  const userName = localStorage.getItem('userName')
  const [show, setShow] = useState(false)


  return (
    <Style.Wrap>
      <Style.NavWrapper>
        <Style.NavigationBar>
          <img src={logo_ill} alt="Logo" />
          <div className="profile" onClick={() => setShow(!show)}>
            <OutsideClickHandler onOutsideClick={() => setShow(false)}>
              {userName && userName?.trim().length > 3 && (
                <div className="profilePic">
                  <p>{userName?.slice(0, 1)}</p>
                </div>
              )}
              <p className="username">{userName}</p>
              <img
                src={triangle}
                alt="click it"
                className={`${show && 'rotate'} triangle`}
              />

              <Logout show={show} />
            </OutsideClickHandler>
          </div>
        </Style.NavigationBar>
      </Style.NavWrapper>
    </Style.Wrap>
  )
}
