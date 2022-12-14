import './Footer.css'
import { useTheme } from '../Hooks/useTheme'

const Footer = () => {
  const { theme } = useTheme()
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <footer>
      <div className={'footerWrapper'}>
        <button className={`btn btn-danger top`} onClick={scrollToTop}>
          Voltar para o topo
        </button>
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a class navbar-dark bg-dark ou navbar-light bg-light  */}
        <div className={`navbar-${theme} bg-${theme} footer`}>
          <div className="container">
            <div className={`row`}>
              <div className="col-sm-12 col-lg-6">
                {/* //Na linha seguinte deverá ser feito um teste se a aplicação
                // está em dark mode e deverá utilizar o css correto */}
                <img
                  className={`dhLogo ${theme === 'dark' ? 'iconsDark' : ''}`}
                  src="/images/DH.png"
                  alt="DH-logo"
                />
              </div>
              <div
                className={`col-sm-12 col-lg-6 icons ${
                  theme === 'dark' ? 'iconsDark' : ''
                }`}
              >
                <img
                  src="/images/ico-facebook.png"
                  alt="ícone do facebook"
                  className={`icon`}
                />
                <img
                  src="/images/ico-instagram.png"
                  alt="ícone do instagram"
                  className={`icon`}
                />
                <img
                  src="/images/ico-whatsapp.png"
                  alt="ícone do whatsapp"
                  className={`icon`}
                />
                <img
                  src="/images/ico-tiktok.png"
                  alt="ícone do tiktok"
                  className={`icon`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
