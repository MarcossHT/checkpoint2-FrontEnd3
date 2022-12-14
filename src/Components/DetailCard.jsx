import { useEffect, useState } from 'react'
import ScheduleFormModal from './ScheduleFormModal'
import './DetailCard.css'
import { useTheme } from '../Hooks/useTheme'

const DetailCard = props => {
  const { theme } = useTheme()
  const [dentistas, setDentistas] = useState({})

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    fetch(
      `https://dhodonto.ctdprojetos.com.br/dentista?matricula=${props.matricula}`
    ).then(response => {
      response.json().then(dentistasList => {
        setDentistas({
          nome: dentistasList.nome,
          sobrenome: dentistasList.sobrenome,
          usuario: dentistasList.usuario.username
        })
      })
    })
  }, [props.matricula])

  return (
    //As instruções que estão com {''} precisam ser
    //substituídas com as informações que vem da api
    <>
      <h1>Detalhes sobre o dentista {dentistas.nome} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div className={`card-body row  ${theme === 'dark' ? 'cardDark' : ''}`}>
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentistas.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentistas.sobrenome}
              </li>
              <li className="list-group-item">Usuário: {dentistas.usuario}</li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${theme} button `}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  )
}

export default DetailCard
