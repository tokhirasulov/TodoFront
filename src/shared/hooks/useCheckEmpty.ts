import { SetStateAction, useEffect } from 'react'

interface IProps {
  headLine: string
  desc: string
  headLineSet: React.Dispatch<SetStateAction<boolean>>
  descSet: React.Dispatch<SetStateAction<boolean>>
}

export const useCheckEmpty = ({
  headLine,
  desc,
  headLineSet,
  descSet,
}: IProps) => {
  useEffect(() => {
    if (desc?.length > 0) {
      if (desc?.trim().length === 0) {
        descSet(true)
      } else {
        descSet(false)
      }
    }
  }, [desc])

  useEffect(() => {
    if (headLine?.length > 0) {
      if (headLine?.trim().length === 0) {
        headLineSet(true)
      } else if (headLine?.trim().length > 0) {
        headLineSet(false)
      }
    }
  }, [headLine])
}

export default useCheckEmpty
