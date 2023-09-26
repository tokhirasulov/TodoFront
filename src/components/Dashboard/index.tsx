import * as Style from './styled'
import calendar_icon from '../../shared/assets/calendar.svg'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Item } from '../../page/Tasks'
import { MoreOptions } from '../MoreOptions'
import { useState } from 'react'
import infoIcon from '../../shared/assets/info-icon.png'

interface IProps {
  status: Item[]
  title: string
  dropId: string
}

export const Dashboard = ({ status, title, dropId }: IProps) => {
  const draggable = false
  const notDraggable = true
  const [showInfoPop, setShowInfoPop] = useState(false)

  const handleHover = (e: any) => {
    setShowInfoPop(!showInfoPop)
    console.log(e.target)
  }

  return (
    <Style.StatusSection>
      <Style.Status>
        <h3>{title}</h3>
        <div className="statusLength">
          <p>{status.length}</p>
        </div>
      </Style.Status>
      <div className="tasks">
        <Droppable droppableId={dropId} isDropDisabled={false}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className={`emptySpace ${status?.length > 0 && 'hide'}`}>
                <img
                  src={infoIcon}
                  alt="hover here "
                  className="infoIcon"
                  onMouseEnter={() => setShowInfoPop(true)}
                  onMouseLeave={() => setShowInfoPop(false)}
                />
                <div className={`infoPop ${!showInfoPop ? 'hide' : ''}`}>
                  <p>Drag and drop tasks here</p>
                </div>
                <span>+</span>
              </div>
              {status.map((item: Item, index: number) => (
                <Draggable
                  key={item._id}
                  draggableId={item._id}
                  index={index}
                  isDragDisabled={
                    item.status === 'completed' ? notDraggable : draggable
                  }
                >
                  {(provided) => (
                    <Style.Task
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="title">
                        <h3>{item?.name}</h3>
                        <MoreOptions taskId={item._id} status={item.status} />
                      </div>
                      <p className="description">{item.description}</p>
                      <Style.Estimation status={item.status}>
                        <img src={calendar_icon} alt="calendar_icon" />
                        <p>{item.date}</p>
                      </Style.Estimation>
                    </Style.Task>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </Style.StatusSection>
  )
}
