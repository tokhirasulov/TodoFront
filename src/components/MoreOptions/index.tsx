import { useState } from 'react'
import * as Style from './styled'
import dotsIcon from '../../shared/assets/dots.svg'
import editIcon from '../../shared/assets/edit.svg'
import deleteIcon from '../../shared/assets/delete.svg'
import { useDispatch } from 'react-redux'
import { setTaskId } from '../../store/features/taskId/taskIdSlice'
import { showDeletePop, showWarningPop } from '../../store/features/popUp'
import OutsideClickHandler from 'react-outside-click-handler'

interface MProps {
  taskId: string
  status: string
}

export interface StatusProps {
  status: string
}

export const MoreOptions = ({ taskId, status }: MProps) => {
  const [moreshow, setMoreShow] = useState(false)
  const dispatch = useDispatch()

  const handleClick = (e: any) => {
    setMoreShow(true)
  }

  const editHandler = () => {
    setMoreShow(false)
    dispatch(showWarningPop())
    dispatch(setTaskId(taskId))
  }

  const deleteHandler = () => {
    setMoreShow(false)
    dispatch(showDeletePop())
    dispatch(setTaskId(taskId))
  }

  return (
    <>
      <Style.Wrapper>
        <div onClick={handleClick} className="dots">
          <img src={dotsIcon} alt="more Options" />
        </div>
        {moreshow && (
          <OutsideClickHandler onOutsideClick={() => setMoreShow(false)}>
            <Style.Container status={status}>
              <div className="edit" onClick={editHandler}>
                <p>Edit</p>
                <img src={editIcon} alt="Edit" />
              </div>
              <div className="delete" onClick={deleteHandler}>
                <p>Delete</p>
                <img src={deleteIcon} alt="Delete" />
              </div>
            </Style.Container>
          </OutsideClickHandler>
        )}
      </Style.Wrapper>
    </>
  )
}
