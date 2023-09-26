import { configs } from '../../configs'

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
