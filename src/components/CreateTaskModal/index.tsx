import * as Style from './styled'
import { ErrorMessage } from '../ErrorMessage'
import { ButtonPrimary } from '../ButtonPrimary'
import { useForm } from 'react-hook-form'
import { colors } from '../../shared/colors'
import { useEffect, useState } from 'react'
import { DatePicker, Space, DatePickerProps } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideCreate } from '../../store/features/createTaskModal/createTaskSlice'
import { useNavigate } from 'react-router-dom'
import { config } from '../../shared/utils'
import dayjs from 'dayjs'
import useCheckEmpty from '../../shared/hooks/useCheckEmpty'

interface Inputs {
  headLine: string
  description: string
  estimation?: string
  status: 'backlog'
}

interface TaskProps {
  setItems: Function
}

export const CreateTask = ({ setItems }: TaskProps) => {
  const [charNum, setCharNum] = useState(0)
  const [isLimit, setIsLimit] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [minLimitHead, setMinLimitHead] = useState(false)
  const [minLimitDesc, setMinLimitDesc] = useState(false)
  const dispatch = useDispatch()
  const show = useSelector(({ taskPopUp }) => taskPopUp.isShown)
  const navigate = useNavigate()
  //  React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    mode: 'onTouched',
  })
  const description = watch('description')
  const headLine = watch('headLine')

  // Functions
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    register('estimation', {
      value: dateString,
    })
    register('status', {
      value: 'backlog',
    })
  }
  const closePop = () => {
    dispatch(hideCreate())
    reset({
      headLine: '',
      description: '',
      estimation: '',
    })
  }

  const sendForm = (data: Inputs) => {
    setButtonDisabled(true)
    if (headLine.trim().length > 0 && description.trim().length > 0) {
      return new Promise(async (res, rej) => {
        const form = new FormData()
        form.append('headLine', data.headLine)
        form.append('description', data.description)
        if (data.estimation) form.append('estimation', data.estimation)
        const d = { data, userId: localStorage.getItem('userId') }
        axios
          .request(config('POST', 'tasks', d))
          .then((response) => {
            if (response.status === 200) {
              setItems(response.data)
              dispatch(hideCreate())
              reset({
                headLine: '',
                description: '',
              })
            } else if (response.status === 203) {
              navigate('/login')
            }
            setButtonDisabled(false)
          })
          .catch((error) => {
            if (error.response.status === 401) {
              navigate('/login')
            }
          })
      })
    }
  }
  console.log(buttonDisabled)

  useEffect(() => {
    setCharNum(description?.length)
    if (description?.length >= 100) {
      setIsLimit(true)
    } else {
      setIsLimit(false)
    }
  }, [description])

  useEffect(() => {
    setFocus('headLine')
  }, [])

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
      {show && (
        <Style.ModalWrapper>
          <Style.Modal>
            <form
              onSubmit={handleSubmit((data) => sendForm(data))}
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
                    maxLength: 49,
                    minLength: 0,
                  })}
                  id="headline"
                  placeholder="Reading Book"
                  autoComplete="off"
                  maxLength={50}
                />
                {errors.headLine?.message && (
                  <ErrorMessage errorField={errors.headLine.message} />
                )}
                {errors.headLine?.type === 'maxLength' && (
                  <ErrorMessage errorField={'Max length is 50 characters'} />
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
                  maxLength={100}
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: 100,
                    minLength: 0,
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
                  <DatePicker
                    style={{ width: '100%' }}
                    id="estimation"
                    onChange={onChange}
                    className="create-input"
                    disabledDate={disabledDate}
                  />
                </Space>
              </Style.InputWrapper>
              <div className="buttonWrapper">
                <ButtonPrimary
                  backgroundColor={colors.primary}
                  innerText="Create"
                  width="100%"
                  disable={buttonDisabled}
                />
                <ButtonPrimary
                  backgroundColor={colors.white}
                  innerText="Cancel"
                  width="100%"
                  style={{ border: 'none' }}
                  type="button"
                  onClick={closePop}
                />
              </div>
            </form>
          </Style.Modal>
        </Style.ModalWrapper>
      )}
    </>
  )
}
