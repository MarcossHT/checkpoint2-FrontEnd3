import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'

const Logout = () => {
  const navigate = useNavigate()
  const { saveToken } = useAuth()
  useEffect(() => {
    saveToken({
      state: 'auth',
      auth: ''
    })
    navigate('/home')
  })
  return <></>
}

export default Logout
