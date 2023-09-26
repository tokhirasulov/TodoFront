import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deletePop: false,
  warningPop: false,
  logoutPop: false,
}

export const PopUpSlice = createSlice({
  name: 'PopUp',
  initialState,
  reducers: {
    showDeletePop: (state) => {
      state.deletePop = true
    },
    hideDeletePop: (state) => {
      state.deletePop = false
    },
    showWarningPop: (state) => {
      state.warningPop = true
    },
    hideWarningPop: (state) => {
      state.warningPop = false
    },
    showLogoutPop: (state) => {
      state.logoutPop = true
    },
    hideLogoutPop: (state) => {
      state.logoutPop = false
    },
  },
})

export const {
  showDeletePop,
  showLogoutPop,
  showWarningPop,
  hideDeletePop,
  hideLogoutPop,
  hideWarningPop,
} = PopUpSlice.actions

export default PopUpSlice.reducer
