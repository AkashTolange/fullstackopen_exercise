
import {useReducer, useContext, createContext } from "react";

//initial state
const NotificationContext = createContext();

//define the reducer
const notificationReducer = (state, action) => { 
    switch(action.type){ 
        case 'SET_NOTIFICATION':
            return action.payload;
        case 'CLEAR_NOTIFICATION': 
            return null;
        default: 
            state;
    }
}

//create the provider 
export const NotificationProvider = ({ children }) => { 
    const [notification, dispatch] = useReducer(notificationReducer, null);

    //helper function: setNotification
    const setNotification =(message) =>{ 
        dispatch({ type: 'SET_NOTIFICATION', payload: message})

        //auto-clear after 5 seconds
        setTimeout(() => { 
            dispatch({ type: 'CLEAR_NOTIFICATION'})
        }, 5000)
    }

    return ( 
        <NotificationContext.Provider value={{setNotification, notification}}>
            {children}
        </NotificationContext.Provider>
    )
};

//custom hook for convenience 
export const useNotification = () => useContext(NotificationContext);
//export