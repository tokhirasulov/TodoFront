import empty_illus from '../../shared/assets/Illustration.svg'
import { colors } from '../../shared/colors'
import { ButtonPrimary } from '../../components/ButtonPrimary'
import * as Style from './styled'
import { useSelector } from 'react-redux'

interface EmptyProps {
  handleClick: () => void
}

export const EmptyPage = ({ handleClick }: EmptyProps) => {
  const show = useSelector(({ taskPopUp }) => taskPopUp.isShown)
  return (
    <Style.EmptyList className={`${show ? 'blur' : ''}`}>
      <img src={empty_illus} alt="emty list" />
      <div className="text">
        <h3>Ready to get productivity?</h3>
        <p>Add your tasks and kickstart your productivity</p>
      </div>
      <div className="buttonWrapper" onClick={handleClick}>
        <ButtonPrimary
          backgroundColor={colors.primary}
          innerText="+ Add new task"
          style={{ padding: '8px 12px' }}
        />
      </div>
    </Style.EmptyList>
  )
}
