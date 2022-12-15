import { useState, createContext, useContext } from 'react'

// Criação do Contexto
const AuthContext = createContext()

export function AuthProvider(props) {
  const authLocalStorage = localStorage.getItem('auth')

  const [auth, setAuth] = useState(
    authLocalStorage === null ? '' : authLocalStorage
  )

  // Função responsavel por salvar o token
  function saveToken(tokenReceived) {
    if (tokenReceived !== auth) {
      setAuth(tokenReceived)
      localStorage.setItem('auth', tokenReceived)
    }
  }

  function removeToken() {
    setAuth('')
    localStorage.removeItem('auth')
    alert("Usuário deslogado")
  }

  return (
    // Construção dos Elementos para utilizarmos o Contexto em nossa Aplicação, tudo o que for contido no "value" será exportado e poderá ser utilizado em Componentes que utilizarem o Hook Customizado "useTheme"
    <AuthContext.Provider value={{ auth, saveToken, removeToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

// Hook Personalizado que irá ser utilizado quando quisermos utilizar alguma das Funcionalidades contidas em nosso Contexto
export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
