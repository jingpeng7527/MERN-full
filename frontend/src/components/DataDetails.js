import { useDataContext } from '../hooks/useDataContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const DataDetails = ({ data }) => {
  const { dispatch } = useDataContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/data/' + data._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_DATA', payload: json})
    }
  }

  return (
    <div className="data-details">
      <h4>{data.name}</h4>
      <p><strong>item: </strong>{data.item}</p>
      <p><strong>money($): </strong>{data.bill}</p>
      <p>{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default DataDetails