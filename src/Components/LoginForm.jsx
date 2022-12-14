import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth"
import { useTheme } from '../hooks/useTheme'

import styles from "./Form.module.css";

const LoginForm = () => {

  const { theme } = useTheme()
  const { saveToken } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState({usernameError: false, passwordError: false, genericError: false})

  const navigate = useNavigate()

  const validateUsername = (username) => {
    setFormError(prevState => ({...prevState, genericError: false}))   

    const withoutSpaces = username.trim()
  
    if (withoutSpaces.length >= 5) {

      setFormError(prevState => ({...prevState, usernameError: false}))
      setUsername(username)
      return true

    } else {

      setFormError(prevState => ({...prevState, usernameError: true}))
      return false

    }
  }
  
  const validatePassword = (password) => {
    setFormError(prevState => ({...prevState, genericError: false}))   
    
    if (password.length >= 8) {

      setFormError(prevState => ({...prevState, passwordError: false}))
      setPassword(password)
      return true

    } else {

      setFormError(prevState => ({...prevState, passwordError: true}))
      return false

    }

  }

  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  
    e.preventDefault()

    let signInData = {
      "username": username,
      "password": password
    }

    let requestHeaders = {
      'Content-Type': 'application/json'
    }

    let requestConfiguration = {
      method: 'POST',
      body: JSON.stringify(signInData),
      headers: requestHeaders
    }

    if(validateUsername && validatePassword) {

      fetch(`https://dhodonto.ctdprojetos.com.br/auth`, requestConfiguration).then(
        response => {
          if(response.ok) {            
            response.json().then(
              data => {
                // setFormError(false)
                saveToken(data.token)
                alert('Login realizado com sucesso!')
                navigate('/home')
              }
            )
          } else {
            setFormError({usernameError: false, passwordError: false, genericError: true})            
            alert('Usuário e/ou senha incorreto(s)!')
          }
        }
      )
    }
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card} ${theme === 'dark' ? `${styles.cardDark}` : ''} ${formError.genericError ? `${styles.formError}` : ''}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing} ${formError.usernameError ? `${styles.formError}` : ''}`}
              placeholder="Login"
              name="login"
              required
              onChange={(event) => validateUsername(event.target.value)}
            />

            {
              formError.usernameError && 
              <span className={`${styles.formError}`}>O nome de usuário deve conter pelo menos 5 caracteres</span>
            }

            <input
              className={`form-control ${styles.inputSpacing} ${formError.passwordError ? `${styles.formError}` : ''}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              onChange={(event) => validatePassword(event.target.value)}
            />

            {
              formError.passwordError && 
              <span className={`${styles.formError}`}>A senha deve conter pelo menos 8 caracteres</span>
            }

            <button className={`btn btn-primary`} type="submit" onClick={(event) => handleSubmit(event)}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
