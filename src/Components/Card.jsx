import './Card.css'
import { useTheme } from '../Hooks/useTheme'

const Card = props => {
  const { theme } = useTheme()

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card ${theme === 'dark' ? 'cardDark' : ''}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body CardBody`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}
          <a href={`/dentist/${props.matricula}`}>
            <h5 className={`card-title title`}>{props.nome}</h5>
          </a>
          <p className={`card-text`}>{props.sobrenome}</p>
        </div>
      </div>
    </>
  )
}

export default Card
