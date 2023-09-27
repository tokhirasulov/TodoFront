import { SetStateAction } from 'react'
import { colors } from '../../shared/colors'
import { notifyUser } from '../../shared/utils'
import { ButtonPrimary } from '../ButtonPrimary'
import * as Style from './styled'

interface NProps {
  showNotification: boolean
  setShowNotification: React.Dispatch<SetStateAction<boolean>>
}

export const NotificationPop = ({
  showNotification,
  setShowNotification,
}: NProps) => {
  console.log(showNotification)

  return (
    <>
      {showNotification && (
        <Style.Wrapper>
          <h5>Would you like to be reminded about your tasks?</h5>
          <Style.ButtonWrapper>
            <ButtonPrimary
              style={{ padding: '6px 8px' }}
              innerText="Disable"
              backgroundColor={colors.white}
              onClick={() => setShowNotification(!showNotification)}
            />
            <ButtonPrimary
              style={{ padding: '6px 8px' }}
              innerText="Enable"
              backgroundColor={colors.primary}
              onClick={notifyUser}
            />
          </Style.ButtonWrapper>
        </Style.Wrapper>
      )}
    </>
  )
}
