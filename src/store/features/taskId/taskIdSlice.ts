import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
}

export const taskIdSlice = createSlice({
  name: 'taskId',
  initialState,
  reducers: {
    setTaskId: (state, action) => {
        state.id = action.payload
    }},
  },
)

export const {setTaskId} =  taskIdSlice.actions
export default taskIdSlice.reducer