'use client'

import { noop } from 'lodash'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

export const AuthContext = createContext({
  first: false,
  setFirst: noop,
  isAuth: false,
  setIsAuth: noop,
  currentUser: {},
  setCurrentUser: noop,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

function useProvideAuth() {
  const [first, setFirst] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  return {
    first,
    setFirst,
    isAuth,
    setIsAuth,
    currentUser,
    setCurrentUser,
  }
}
