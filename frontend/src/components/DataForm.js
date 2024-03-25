import { useState } from "react"
import { useDataContext } from "../hooks/useDataContext"
import { useAuthContext } from '../hooks/useAuthContext'

const DataForm = () => {
  const { dispatch } = useDataContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [item, setItem] = useState('')
  const [bill, setBill] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const data = {name, item, bill}

    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setItem('')
      setBill('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_DATA', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Data</h3>

      <label>Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Item:</label>
      <input 
        type="text"
        onChange={(e) => setItem(e.target.value)}
        value={item}
        className={emptyFields.includes('item') ? 'error' : ''}
      />

      <label>Money($)</label>
      <input 
        type="number"
        onChange={(e) => setBill(e.target.value)}
        value={bill}
        className={emptyFields.includes('bill') ? 'error' : ''}
      />

      <button>Add Data</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default DataForm