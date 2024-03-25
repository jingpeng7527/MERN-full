import { useEffect }from 'react'
import { useDataContext } from "../hooks/useDataContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import DataDetails from '../components/DataDetails'
import DataForm from '../components/DataForm'

const Home = () => {
  const {data, dispatch} = useDataContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_DATA', payload: json})
      }
    }

    if (user) {
      fetchData()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="data">
        {data && data.map((data) => (
          <DataDetails key={data._id} data={data} />
        ))}
      </div>
      <DataForm />
    </div>
  )
}

export default Home