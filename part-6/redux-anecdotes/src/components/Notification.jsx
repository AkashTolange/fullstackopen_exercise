// import { useSelector } from 'react-redux'
import { useNotification } from '../context/NotificationContext'

const Notification = () => {
  // const notification = useSelector(state => state.notification)
  //this exercise wants you to use useContext 
  const { notification } = useNotification()

  if(!notification) return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    // what the hell
    color: notification.includes('Error') ? 'red': 'green',
    backgroundColor: "#eee"
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
