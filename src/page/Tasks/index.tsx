import axios from 'axios'
import { SetStateAction, useEffect, useLayoutEffect, useState } from 'react'
import * as Style from './styled'
import { useNavigate } from 'react-router-dom'
import { ButtonPrimary } from '../../components/ButtonPrimary'
import { colors } from '../../shared/colors'
import { CreateTask } from '../../components/CreateTaskModal'
import { EmptyPage } from '../../widgets/EmptyPage'
import { Nav } from '../../components/Nav/navigation'
import { config } from '../../shared/utils'
import { DragDropContext } from 'react-beautiful-dnd'
import { Header } from '../../components/Header'
import { Dashboard } from '../../components/Dashboard'
import { useDispatch } from 'react-redux'
import { showCreate } from '../../store/features/createTaskModal/createTaskSlice'
import { useSelector } from 'react-redux'
import { UpdateTask } from '../../components/UpdateTaskModal'
import deleteIcon from '../../shared/assets/deleteBigger.svg'
import logoutIcon from '../../shared/assets/logoutIcon.svg'
import warningIcon from '../../shared/assets/warning.svg'
import PopUp from '../../components/PopUp'

export interface Item {
  _id: string
  name: string
  description: string
  date: string
  status: string
}

export const Tasks = () => {
  const [items, setItems] = useState<Item[]>([])
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const modalShow = useSelector(({ taskPopUp }) => taskPopUp.isShown)
  const showUpdate = useSelector(({ updatePopUp }) => updatePopUp.updateTask)
  const deletePop = useSelector(({ popUp }) => popUp.deletePop)
  const editPop = useSelector(({ popUp }) => popUp.warningPop)
  const logoutPop = useSelector(({ popUp }) => popUp.logoutPop)

  const navigate = useNavigate()

  const handleDragEnd = ({ draggableId, destination, source }: any) => {
    const i = items.findIndex((item: Item) => item._id === draggableId)

    const status = destination?.droppableId
    if (!destination) return
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return

    setItems((prev) => [...prev, (prev[i].status = status)])
    updateTasks(status, draggableId)
  }

  const updateTasks = async (status: string, draggableId: string) => {
    const data = {
      status: status,
      task_id: draggableId,
      user_id: localStorage.getItem('userId'),
    }

    try {
      const response = await axios.request(config('PATCH', 'tasks', data))

      if (response.status === 203) {
        navigate('/login')
      } else if (response.status === 200) {
        setItems(response.data)
      }
    } catch (error) {
      // @ts-ignore
      if (error.response.status === 401) {
        navigate('/login')
      }
    }
  }

  const getData = async () => {
    try {
      axios
        .request(config('GET', 'tasks'))
        .then((response) => {
          if (response.status === 203) {
            navigate('/login')
          } else if (response.status === 200) {
            setItems(response.data.data)
          }
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate('/login')
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [showUpdate, deletePop, editPop, logoutPop])

  useLayoutEffect(() => {
    try {
      axios
        .request(config('GET', 'tasks'))
        .then((response) => {
          setIsLoading(true)
          if (response.status === 203) {
            navigate('/login')
          } else if (response.status === 200) {
            setItems(response.data.data)
          }
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            navigate('/login')
          }
        })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      setIsEmpty(false)
    } else {
      setIsEmpty(true)
    }
  }, [items])

  const handleClick = () => {
    dispatch(showCreate())
  }

  console.log(isLoading)

  const backlog = items.filter((item: Item) => item.status === 'backlog')
  const in_progress = items.filter(
    (item: Item) => item.status === 'in_progress'
  )
  const completed = items.filter((item: Item) => item.status === 'completed')

  return (
    <>
      {!isLoading ? (
        <div className="circlesWrapper">
          <div className="circles">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
            <div className="circle5"></div>
            <div className="circle6"></div>
            <div className="circle7"></div>
            <div className="circle8"></div>
            <div className="circle9"></div>
            <div className="circle10"></div>
            <div className="circle11"></div>
            <div className="circle12"></div>
            <div className="circle13"></div>
            <div className="circle14"></div>
            <div className="circle15"></div>
          </div>
        </div>
      ) : (
        <>
          <Nav />
          <Style.Wrapper>
            <CreateTask setItems={setItems} />
            <UpdateTask />
            {deletePop && (
              <PopUp
                modal_icon={deleteIcon}
                buttonText="Delete"
                title="Delete Task"
                status="Delete"
                message="Are you sure you want to delete this task? This action can not be
          undone."
                color="#EF4444"
                bgColor="#fee2e2"
              />
            )}

            {editPop && (
              <PopUp
                modal_icon={warningIcon}
                buttonText="Edit"
                title="Edit Task"
                status="Edit"
                message="Are you sure you want to delete this task? This action can not be
          undone."
                color="#F59E0B"
                bgColor="#FDF0C8"
              />
            )}
            {logoutPop && (
              <PopUp
                modal_icon={logoutIcon}
                buttonText="Log out"
                title="Log out"
                message="Are you sure you want to delete this task? This action can not be
          undone."
                color={colors.primary}
                bgColor="#F1F5F9"
              />
            )}
            {isEmpty ? (
              <EmptyPage handleClick={handleClick} />
            ) : (
              <Style.TaskWrapper
                className={
                  modalShow || deletePop || editPop || logoutPop || showUpdate
                    ? 'blur'
                    : ''
                }
              >
                <Style.MainContent>
                  <Header handleClick={handleClick} />
                  <Style.Progress>
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <div className="first-column">
                        <Dashboard
                          status={backlog}
                          title="Backlog"
                          dropId="backlog"
                        />
                        <div className="buttonWrapper">
                          <ButtonPrimary
                            backgroundColor={colors.white}
                            innerText="+ Add new task"
                            style={{ border: `1px dashed ${colors.primary}` }}
                            width="100%"
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                      <Dashboard
                        status={in_progress}
                        title="In Progress"
                        dropId="in_progress"
                      />
                      <Dashboard
                        status={completed}
                        title="Completed"
                        dropId="completed"
                      />
                    </DragDropContext>
                  </Style.Progress>
                </Style.MainContent>
              </Style.TaskWrapper>
            )}
          </Style.Wrapper>
        </>
      )}
    </>
  )
}
