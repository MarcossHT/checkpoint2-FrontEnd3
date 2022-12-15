import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useParams } from "react-router-dom";
import { useTheme } from '../hooks/useTheme'

const DetailCard = () => {
  
  const params = useParams()
  const { theme } = useTheme()

  const [dentist, setDentist] = useState({})

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado

    fetch(`https://dhodonto.ctdprojetos.com.br/dentista?matricula=${params.matricula}`).then(
      response => {
        if(response.ok) {            
          response.json().then(
            data => {
              setDentist(data)                 
            }
          )
        // } else {
        //   console.log("Error")
        }
      }
    )
  }, [params]);

  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      {dentist?.usuario ? (
        <>
          <h1>Detail about Dentist {dentist.nome} </h1>
          <section className="card col-sm-12 col-lg-6 container">
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
            // está em dark mode e deverá utilizar o css correto */}
          <div className={`card-body row ${theme === 'dark' ? `${styles.cardDark}` : ''}`}>
              <div className="col-sm-12 col-lg-6">
                <img
                  className="card-img-top"
                  src="/images/doctor.jpg"
                  alt="doctor placeholder"
                />
              </div>
              <div className="col-sm-12 col-lg-6">
                <ul className="list-group">
                  <li className="list-group-item">Nome: {dentist.nome}</li>
                  <li className="list-group-item">
                    Sobrenome: {dentist.sobrenome}
                  </li>
                  <li className="list-group-item">
                    Usuário: {dentist.usuario.username}
                  </li>
                </ul>
                <div className="text-center">
                  {/* //Na linha seguinte deverá ser feito um teste se a aplicação
                  // está em dark mode e deverá utilizado o css correto */}
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className={`btn btn-${theme} ${styles.button
                      }`}
                  >
                    Marcar consulta
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null }

      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
