import { ButtonPrimary } from '../../../components/ButtonPrimary'
import * as Style from './styled'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ErrorMessage } from '../../../components/ErrorMessage'
import showEye from '../../../shared/assets/password-show.svg'
import hideEye from '../../../shared/assets/password-hide.svg'
import { colors } from '../../../shared/colors'
import { configs } from '../../../configs'
import { config } from '../../../shared/utils/index'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import mainImage from '../../../shared/assets/mainImage.png'

type Inputs = {
  fullName: string
  email: string
  password: string
  confirmPassword?: string
}

export const Registration = () => {
  const [passwordShow, setpasswordShow] = useState(false)
  const [confirmShow, setconfirmShow] = useState(false)
  const [isUserExist, setIsUserExist] = useState(false)
  const [minFullName, setMinFullName] = useState(false)
  const emailRef = useRef(null)
  const navigate = useNavigate()
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
  const NAME_REGEX = /^[a-z ,.'-]+$/i
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onTouched',
  })

  const password = watch('password')
  const email = watch('email')
  const fullName = watch('fullName')

  useEffect(() => {
    setFocus('fullName')
    const checkVerified = async () => {
      axios
        .request(config('GET', 'auth/registration'))
        .then((response) => {
          if (response.status === 200) {
            navigate('/')
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate('/registration')
          }
        })
    }
    checkVerified()
  }, [])

  useEffect(() => {
    setIsUserExist(false)
  }, [email])

  const sendForm = (data: any) => {
    const form = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    }
    sendData(form)
    console.log('send')
  }

  useEffect(() => {
    if (fullName?.trim().length === 0) {
      setMinFullName(true)
    } else if (fullName?.trim().length > 0) {
      setMinFullName(false)
    }
  }, [fullName])

  const sendData = (param: any) => {
    if (!minFullName) {
      return new Promise(async (res, rej) => {
        const data = new FormData()
        data.append('fullName', param.fullName)
        data.append('email', param.email)
        data.append('password', param.password)

        axios
          .request(config('POST', 'auth/registration', data))
          .then((response) => {
            res(true)
            console.log(response)
            if (response.status === 200) {
              localStorage.setItem('token', response.data.accessToken)
              const userId = response.data.userData._id
              const name = response.data.userData.fullName
              localStorage.setItem('userId', userId)
              localStorage.setItem('userName', name)
              navigate('/')
              console.log(response.data)
            } else if (response.status === 208) {
              setIsUserExist(true)
            }
          })
          .catch(rej)
      })
    }
  }
  console.log(watch('email'))

  return (
    <Style.Container>
      <div className="img-container">
        <img src={mainImage} alt="mainImage" />
      </div>
      <Style.StyledWrapper>
        <Style.Title>Daily Task</Style.Title>
        <form
          onSubmit={handleSubmit((data) => sendForm(data))}
          noValidate
          className="register-form"
        >
          <Style.InputWrapper>
            <label htmlFor="fullName">Enter your full name</label>
            <input
              className="reg-input"
              type="text"
              {...register('fullName', {
                required: 'Enter your name',
                minLength: {
                  value: 3,
                  message: 'Minimum length should be 3 characters',
                },
              })}
              id="fullName"
              placeholder="Tokhir Rasulov"
              autoComplete="off"
            />
            {errors.fullName?.message && (
              <ErrorMessage errorField={errors.fullName.message} />
            )}
            {minFullName && (
              <ErrorMessage
                errorField={'You can not assign you name as empty'}
              />
            )}
          </Style.InputWrapper>
          <Style.InputWrapper>
            <label htmlFor="email">Enter a email</label>
            <input
              className="reg-input"
              type="email"
              {...register('email', {
                required: 'Enter your email',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Invalid email address',
                },
              })}
              id="email"
              placeholder="example@gmail.com"
              autoComplete="off"
            />
            {errors.email?.message && (
              <ErrorMessage errorField={errors.email.message} />
            )}
            {isUserExist && (
              <ErrorMessage
                errorField={'This email has been already registered'}
              />
            )}
          </Style.InputWrapper>
          <Style.InputWrapper>
            <label htmlFor="password">Create a password</label>
            <div className="passwordWrapper">
              <input
                className="reg-input"
                type={passwordShow ? 'text' : 'password'}
                {...register('password', {
                  required: 'Create your password',
                  pattern: {
                    value: PWD_REGEX,
                    message: 'Your password is not strong enough',
                  },
                })}
                id="password"
                placeholder="Password"
              />
              {errors.password?.message && (
                <ErrorMessage errorField={errors.password.message} />
              )}
              <img
                src={passwordShow ? showEye : hideEye}
                className="eyePassword"
                onClick={() => setpasswordShow(!passwordShow)}
              />
            </div>
          </Style.InputWrapper>
          <Style.InputWrapper>
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="passwordWrapper">
              <input
                className="reg-input"
                type={confirmShow ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm password"
                {...register('confirmPassword', {
                  required: 'Confirm password field is required',
                  validate: (value) =>
                    value === password || 'The password do not match',
                })}
              />
              <img
                src={confirmShow ? showEye : hideEye}
                className="eyePassword"
                onClick={() => setconfirmShow(!confirmShow)}
              />
            </div>
            {errors.confirmPassword?.message && (
              <ErrorMessage errorField={errors.confirmPassword.message} />
            )}
          </Style.InputWrapper>
          <ButtonPrimary backgroundColor={colors.primary} innerText="Sign up" />
        </form>

        <Style.LoginWrapper>
          <Link to="/login">
            <ButtonPrimary
              backgroundColor={colors.white}
              width="100%"
              innerText="Sign in"
            />
          </Link>
        </Style.LoginWrapper>
      </Style.StyledWrapper>
    </Style.Container>
  )
}
