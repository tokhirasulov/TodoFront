import styled from 'styled-components'
import error_icon from '../../shared/assets/error_icon.svg'

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  & > .error-icon {
    width: 15px;
  }
  & > .error-message {
    color: #ff3333;
    font-size: 14px;
    font-weight: 500;
  }
`

interface ErrorProps {
  errorField: string | any
}

export const ErrorMessage = ({ errorField }: ErrorProps) => {
  return (
    <ErrorWrapper>
      <img src={error_icon} className="error-icon" alt='error'/>
      <p className="error-message">{errorField}</p>
    </ErrorWrapper>
  )
}
