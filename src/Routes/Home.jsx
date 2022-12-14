import { useEffect, useState } from 'react'
import Card from '../Components/Card'

const Home = () => {
  //Rota para buscar os dentistas: https://dhodonto.ctdprojetos.com.br/dentista

  const [dentistas, setDentistas] = useState([])

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />

    fetch(`https://dhodonto.ctdprojetos.com.br/dentista`).then(response => {
      response.json().then(dentistasList => {
        setDentistas(dentistasList)
      })
    })
  }, [])

  return (
    <>
      <h1>Home</h1>

      <div className="card-grid container">
        {dentistas.map((itens, index) => (
          <Card
            key={index}
            nome={itens.nome}
            sobrenome={itens.sobrenome}
            matricula={itens.matricula}
          />
        ))}
      </div>
    </>
  )
}

export default Home
