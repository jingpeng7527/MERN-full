import { useAuthContext } from './useAuthContext'
import { useDataContext } from './useDataContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchDatas } = useDataContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchDatas({ type: 'SET_DATA', payload: null })
  }

  return { logout }
}