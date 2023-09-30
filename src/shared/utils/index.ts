import { configs } from '../../configs'
import { useSelector } from 'react-redux'
import { Item } from '../../page/Tasks'

export const config = (method: string, endPoint: string, data?: {}) => {
  const axiosConfig = {
    method: method,
    maxBodyLength: Infinity,
    url: `${configs.baseUrl}/${endPoint}`,
    headers: {
      Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    data: data,
  }
  return axiosConfig
}

export const hideConsoleLog = () => {
  const debug = localStorage.getItem('debug')
  if (debug === null) localStorage.setItem('debug', 'client')
  else if (!(debug === 'dev' || debug === '*')) {
    console.log(
      '%cImprove your efficiency',
      'font-size: 30px; color: green; font-weight: bold'
    )
    console.log = () => null
    console.info = () => null
  }
}

const oneHourDiff = (deadLine: Date, now: Date) => {
  const difference = deadLine.getHours() - now.getHours()
  const differenceMin = deadLine.getMinutes() - now.getMinutes()
  if (difference === 1 && differenceMin === 0) {
    return true
  }
  return false
}

export const notifyUser = (tasks: Item[]) => {
  Notification.requestPermission().then((perm) => {
    const time = new Date()
    const today = time.toISOString().split('T')[0]

    if (perm === 'granted') {
      tasks.map((task: Item) => {
        const deadLine = new Date(task.date).toISOString().split('T')[0]
        const d2 = new Date(task.date)
        let date2Hour = Number(task.deadLine.split(':')[0])
        let date2Minutes = Number(task.deadLine.split(':')[1])
        d2.setHours(date2Hour)
        d2.setMinutes(date2Minutes)
        const oneHour = oneHourDiff(d2, time)

        for (let i = 0; i < tasks.length; i++) {
          const deadLine = new Date(tasks[i].date).toISOString().split('T')[0]
          const d2 = new Date(tasks[i].date)
          let date2Hour = Number(tasks[i].deadLine.split(':')[0])
          let date2Minutes = Number(tasks[i].deadLine.split(':')[1])
          d2.setHours(date2Hour)
          d2.setMinutes(date2Minutes)

          if (deadLine === today) {
            const oneHour = oneHourDiff(d2, time)
            if (oneHour) {
              const notification = new Notification(task.name, {
                body: task.description,
              })
            }
          }
        }
      })
    }
  })
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
}
