import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  updateTask: false,
}

export const updateTaskSlice = createSlice({
  name: 'updateTaskSlice',
  initialState,
  reducers: {
    showUpdateTask: (state) => {
      state.updateTask = true
    },
    hideUpdateTask: (state) => {
      state.updateTask = false
    },
  },
})

export const { showUpdateTask, hideUpdateTask } = updateTaskSlice.actions
export default updateTaskSlice.reducer
