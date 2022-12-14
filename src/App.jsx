import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import { useTheme } from './Hooks/useTheme'

function App() {
  const { theme } = useTheme()

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`app ${theme}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
