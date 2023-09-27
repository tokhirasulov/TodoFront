import { useForm } from 'react-hook-form'
import * as Style from './styled'
import { ButtonPrimary } from '../../../components/ButtonPrimary'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ErrorMessage } from '../../../components/ErrorMessage'
import showEye from '../../../shared/assets/password-show.svg'
import hideEye from '../../../shared/assets/password-hide.svg'
import { colors } from '../../../shared/colors'
import axios from 'axios'
import { config } from '../../../shared/utils'
import mainImage from '../../../shared/assets/mainImage.png'

export const Login = () => {
  const [form, setForm] = useState({
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
  })
  const [passwordShow, setpasswordShow] = useState(false)
  const [isUserExist, setIsUserExist] = useState(true)
  const [isPasswordExist, setIsPasswordExist] = useState(true)
  const navigate = useNavigate()

  const [isValidForm, setIsValidForm] = useState({
    email: false,
    password: false,
  })

  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: form.email,
      password: form.password,
    },
  })

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const password = watch('password')
  const email = watch('email')

  useEffect(() => {
    setIsUserExist(true)
  }, [email])

  useEffect(() => {
    setIsPasswordExist(true)
  }, [password])

  const sendForm = (data: any) => {
    const form = {
      email: data.email,
      password: data.password,
    }
    sendData(form)
  }

  const sendData = (param: any) => {
    return new Promise(async (res, rej) => {
      const data = new FormData()
      data.append('email', param.email)
      data.append('password', param.password)

      axios
        .request(config('POST', 'auth/login', data))
        .then((response) => {
          res(true)
          console.log(response)
          if (response.status === 200) {
            localStorage.setItem('token', response.data.accessToken)
            localStorage.setItem('userId', response.data.userData._id)
            localStorage.setItem('userName', response.data.userData.fullName)
            navigate('/')
          } else if (response.status === 208) {
            setIsUserExist(false)
          } else if (response.status === 206) {
            setIsPasswordExist(false)
          }
        })
        .catch(rej)
    })
  }

  useEffect(() => {
    setFocus('email')
    const checkVerified = async () => {
      axios
        .request(config('GET', 'auth/login'))
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            navigate('/')
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate('/login')
          }
        })
    }
    checkVerified()
  }, [])

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
            <label htmlFor="email">Enter a email</label>
            <input
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
            {!isValidForm.email && errors.email?.message && (
              <ErrorMessage errorField={errors.email.message} />
            )}
            {!isUserExist && (
              <ErrorMessage errorField={'This email does not exist'} />
            )}
          </Style.InputWrapper>
          <Style.InputWrapper>
            <label htmlFor="password">Create a password</label>
            <div className="passwordWrapper">
              <input
                className="reg-input"
                type={passwordShow ? 'text' : 'password'}
                {...register('password', {
                  required: 'Enter your password',
                })}
                id="password"
                placeholder="Password"
              />
              {!isValidForm.password && errors.password?.message && (
                <ErrorMessage errorField={errors.password.message} />
              )}
              {!isPasswordExist && (
                <ErrorMessage errorField={'This password does not match'} />
              )}
              <img
                src={passwordShow ? showEye : hideEye}
                className="eyePassword"
                onClick={() => setpasswordShow(!passwordShow)}
              />
            </div>
          </Style.InputWrapper>
          <ButtonPrimary innerText="Sign In" backgroundColor={colors.primary} />
        </form>

        <Style.RegisterWrapper>
          <Link to="/registration">
            <ButtonPrimary
              innerText="Sign Up"
              backgroundColor={colors.white}
              width="100%"
            />
          </Link>
        </Style.RegisterWrapper>
      </Style.StyledWrapper>
    </Style.Container>
  )
}
