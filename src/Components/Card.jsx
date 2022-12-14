import styles from "./Card.module.css"
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const Card = (props) => {
  const { theme } = useTheme()


  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card ${theme === 'dark' ? `${styles.cardDark}` : ''}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}
          <Link to={`../dentist/${props.containerData.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{props.containerData.nome} {props.containerData.sobrenome}</h5>
            <p className={`${theme === 'dark' ? `${styles.cardTextDark}` : `${styles.cardTextLight}`}`}>{props.containerData.usuario.username}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
