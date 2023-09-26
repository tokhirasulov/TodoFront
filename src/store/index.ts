import { configureStore } from '@reduxjs/toolkit'
import createTaskReducer from './features/createTaskModal/createTaskSlice'
import updateTaskReducer from './features/updateTaskModal/updateTaskSlice'
import taskIdReducer from './features/taskId/taskIdSlice'
import PopUpReducer from './features/popUp/index'

export const store = configureStore({
  reducer: {
    taskPopUp: createTaskReducer,
    updatePopUp: updateTaskReducer,
    taskId: taskIdReducer,
    popUp: PopUpReducer,
  },
})
