import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [formError, setFormError] = useState(false)

  const navigate = useNavigate()

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

    try {

      fetch(`http://dhodonto.ctdprojetos.com.br/auth`, requestConfiguration)
        .then(response => {
          if(response.status === 200) {            
            response.json()
              .then(data => {
                setToken(data.token)
                localStorage.setItem('token', data.token)
                navigate('/home')
          })
            // if (address.erro !== undefined) {
            //   alert(
            //     `O Cep: ${cep} não existe ou nao consta na nossa base de dados!`
            //   )
            //   setErrorForm(true)
            // } else {
            //   setErrorForm(false)
            //   setLocations([...locations, address])
            //   useNavigate
            // }
          } else {
            setFormError(true)
            alert('Usuário e/ou senha incorreto(s)!')
          }
      })
    } catch (error) {
      console.log(error)
    }

      }
    // }


  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody} ${formError ? `${styles.formError}` : ''}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" type="submit" onClick={(event) => handleSubmit(event)}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
