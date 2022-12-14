import styles from './Form.css'
import React, { useState } from 'react'
import { useAuth } from '../Hooks/useAuth'
import { useTheme } from '../Hooks/useTheme'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const { theme } = useTheme()
  const { saveToken } = useAuth()
  const [loginUser, setLoginUser] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    let bodyDados = {
      username: loginUser,
      password: password
    }

    let dadosRequisicao = {
      method: 'POST',
      accept: '*/*',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bodyDados)
    }

    fetch(`https://dhodonto.ctdprojetos.com.br/auth`, dadosRequisicao)
      .then(resultado => {
        if (resultado.status === 200) {
          return resultado.json()
        }
        throw resultado
      })
      .then(resultado => {
        saveToken(resultado.token)
        alert('Usuário logado com sucesso')
        navigate('/home')
      })
      .catch(erro => {
        alert('Ocorreu um erro, recarregue a página')
      })
  }

  return (
    <>
      <div
        className={`text-center card container ${styles.card} ${
          theme === 'dark' ? 'cardDark' : ''
        }`}
      >
        <div className={`card-body ${styles.CardBody} `}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="loginUser"
              type="text"
              required
              value={loginUser}
              onChange={e => setLoginUser(e.target.value)}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginForm
