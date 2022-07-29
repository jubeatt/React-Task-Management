import { auth } from "firebase/config"
import { createContext, useEffect, useReducer } from "react"

export const AuthContext = createContext()

const initialState = {
  user: null,
  isUserInit: false
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    case "INIT_USER":
      return {
        ...state, 
        user: action.payload,
        isUserInit: true
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  
  // check the user state
  // user will be an object or null
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch({
        type: 'INIT_USER',
        payload: user
      })
      unsubscribe()
    })
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}