import { createSlice } from '@reduxjs/toolkit'

const initialState = ''  // start with empty message

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload  // message text
    },
    clearNotification() {
      return ''  // remove message
    }
  }
})

export const showNotification = (message, timeInSeconds) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
}



export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
