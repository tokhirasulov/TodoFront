import * as Style from './styled'
import { ErrorMessage } from '../ErrorMessage'
import { ButtonPrimary } from '../ButtonPrimary'
import { useForm } from 'react-hook-form'
import { colors } from '../../shared/colors'
import { useEffect, useState, useMemo } from 'react'
import { DatePicker, Space, DatePickerProps } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import axios from 'axios'
import { hideUpdateTask } from '../../store/features/updateTaskModal/updateTaskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { config } from '../../shared/utils'
import { Item } from '../../page/Tasks'
import dayjs, { Dayjs } from 'dayjs'
import { hideWarningPop } from '../../store/features/popUp'
import { useNavigate } from 'react-router-dom'
import useCheckEmpty from '../../shared/hooks/useCheckEmpty'

interface Inputs {
  headLine: string
  status: string
  description: string
  estimation: string
}

export const UpdateTask = () => {
  const [charNum, setCharNum] = useState(0)
  const [isLimit, setIsLimit] = useState(false)
  const [data, setData] = useState<Item>()
  const [dateValue, setDateValue] = useState<Dayjs>()
  const showUpdate = useSelector(({ updatePopUp }) => updatePopUp.updateTask)
  const navigate = useNavigate()
  const taskId = useSelector(({ taskId }) => taskId.id)
  const dispatch = useDispatch()
  const [minLimitHead, setMinLimitHead] = useState(false)
  const [minLimitDesc, setMinLimitDesc] = useState(false)

  //  React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: 'onTouched',
  })

  const description = watch('description')
  const headLine = watch('headLine')

  useEffect(() => {
    setCharNum(description?.length)
    if (description?.length >= 100) {
      setIsLimit(true)
    } else {
      setIsLimit(false)
    }
  }, [description])

  useEffect(() => {
    const updateTask = async () => {
      try {
        const response = await axios.request(
          config('GET', `tasks/update/${taskId}`)
        )
        const res: Item = response.data
        setData(res)
      } catch (error) {
        console.log(error)
      }
    }
    taskId && updateTask()
    showUpdate && dispatch(hideWarningPop())
  }, [showUpdate])

  useEffect(() => {
    setValue('headLine', data?.name, { shouldDirty: true })
    setValue('description', data?.description, { shouldDirty: true })
    setValue('status', data?.status, { shouldDirty: true })
    setValue('estimation', data?.date, { shouldDirty: true })
    if (data) {
      if (!showUpdate) {
        setDateValue(undefined)
      } else {
        setDateValue(dayjs(data?.date))
      }
    }
  }, [data])

  // Functions
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setValue('estimation', dateString)
    if (!dateString) {
      setValue('estimation', new Date().toISOString().split('T')[0])
    }
  }
  const handleClick = () => {
    dispatch(hideUpdateTask())
  }

  const sendData = (info: Inputs) => {
    const d = { info, taskId }
    axios
      .request(config('PATCH', 'tasks/update', d))
      .then((res) => {
        if (res.status === 200) {
          dispatch(hideUpdateTask())
        } else if (res.status === 203) {
          navigate('/login')
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login')
        }
      })
  }
  useCheckEmpty({
    headLine: headLine,
    desc: description,
    headLineSet: setMinLimitHead,
    descSet: setMinLimitDesc,
  })
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today
    return current < dayjs()
  }

  return (
    <>
      {showUpdate && (
        <Style.ModalWrapper>
          <Style.Modal>
            <form
              // @ts-ignore
              onSubmit={handleSubmit((info) => sendData(info))}
              noValidate
              className="create-form"
            >
              <Style.InputWrapper>
                <label htmlFor="headline">Headline</label>
                <input
                  className="create-input"
                  type="text"
                  {...register('headLine', {
                    required: 'Headline required',
                  })}
                  id="headline"
                  placeholder="Reading Book"
                  autoComplete="off"
                />

                {errors.headLine?.message && (
                  <ErrorMessage errorField={errors.headLine.message} />
                )}
                {minLimitHead && (
                  <ErrorMessage
                    errorField={'You can not set headline as empty'}
                  />
                )}
              </Style.InputWrapper>
              <Style.InputWrapper>
                <label htmlFor="description">Description</label>
                <textarea
                  className="create-input"
                  id="description"
                  placeholder="Description"
                  autoComplete="off"
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: 100,
                  })}
                />

                <div className="lowerSection">
                  {errors.description?.message && (
                    <ErrorMessage errorField={errors.description.message} />
                  )}
                  {isLimit && (
                    <ErrorMessage errorField={'Max length is 100 characters'} />
                  )}
                  {minLimitDesc && (
                    <ErrorMessage
                      errorField={'You can not set description as empty'}
                    />
                  )}
                  <p className="charNum">{charNum}/100</p>
                </div>
              </Style.InputWrapper>
              <Style.InputWrapper>
                <label htmlFor="estimation">Add estimation</label>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {dateValue && (
                    <DatePicker
                      style={{ width: '100%' }}
                      id="estimation"
                      onChange={onChange}
                      className="create-input"
                      defaultValue={dateValue}
                      disabledDate={disabledDate}
                    />
                  )}
                </Space>
              </Style.InputWrapper>
              <div className="buttonWrapper">
                <ButtonPrimary
                  backgroundColor={colors.primary}
                  innerText="Update"
                  width="100%"
                />
                <ButtonPrimary
                  backgroundColor={colors.white}
                  innerText="Cancel"
                  width="100%"
                  style={{ border: 'none' }}
                  type="button"
                  onClick={handleClick}
                />
              </div>
            </form>
          </Style.Modal>
        </Style.ModalWrapper>
      )}
    </>
  )
}
