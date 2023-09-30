import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Item } from '../../../page/Tasks'

const initialState = {
  tasks: <Item[]>[],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    updateTaskStatus: (state, { payload }) => {
      state.tasks[payload.i].status = payload.status
    },
  },
})

export const { setTasks, updateTaskStatus } = tasksSlice.actions
export default tasksSlice.reducer
