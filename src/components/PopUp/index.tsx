import { useState, useMemo } from 'react'
import * as Style from './styled'
import { ButtonPrimary } from '../ButtonPrimary'
import { colors } from '../../shared/colors'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  hideDeletePop,
  hideLogoutPop,
  hideWarningPop,
} from '../../store/features/popUp'
import { config } from '../../shared/utils'
import { showUpdateTask } from '../../store/features/updateTaskModal/updateTaskSlice'
interface PProps {
  status?: string
  modal_icon: string
  title: string
  buttonText: string
  message: string
  color: string
  bgColor: string
}

const PopUp = ({
  status,
  modal_icon,
  title,
  buttonText,
  message,
  color,
  bgColor,
}: PProps) => {
  const taskId = useSelector(({ taskId }) => taskId.id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(taskId)

  const handleClick = () => {
    if (status === 'Delete') {
      axios
        .request(config('DELETE', 'tasks', { taskId }))
        .then((res) => {
          if (res.status === 200) {
            dispatch(hideDeletePop())
          } else if (res.status === 203) {
            navigate('/login')
          }
        })
        .catch((error) => {
          if (error.response.status) {
            navigate('/login')
          }
        })
    } else if (status === 'Edit') {
      dispatch(showUpdateTask())
    } else {
      localStorage.clear()
      dispatch(hideLogoutPop())
      navigate('/login')
    }
  }

  const close = () => {
    dispatch(hideDeletePop())
    dispatch(hideWarningPop())
    dispatch(hideLogoutPop())
  }
  return (
    <>
      <Style.ModalWrapper>
        <Style.Modal>
          <Style.Main>
            <div className="image_bg" style={{ backgroundColor: bgColor }}>
              <img src={modal_icon} alt="icon" />
            </div>
            <div className="text">
              <h3 className="title">{title}</h3>
              <p className="message">{message}</p>
            </div>
          </Style.Main>
          <Style.Footer>
            <ButtonPrimary
              backgroundColor={colors.white}
              color="#475569"
              style={{
                padding: '8px 12px',
                border: '1px solid #CBD5E1',
              }}
              innerText="Cancel"
              onClick={close}
            />
            <ButtonPrimary
              backgroundColor={color}
              innerText={buttonText}
              style={{ padding: '8px 12px' }}
              onClick={handleClick}
            />
          </Style.Footer>
        </Style.Modal>
      </Style.ModalWrapper>
    </>
  )
}

export default PopUp
