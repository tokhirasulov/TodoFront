import { createSlice } from '@reduxjs/toolkit'

const initialState = { isShown: false }
export const createTaskSlice = createSlice({
  name: 'createTask',
  initialState,
  reducers: {
    showCreate: (state) => {
      state.isShown = true
    },
    hideCreate: (state) => {
      state.isShown = false
    },
  },
})

export const { showCreate, hideCreate } = createTaskSlice.actions
export default createTaskSlice.reducer
