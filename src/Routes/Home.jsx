import { useEffect } from "react";
import { useState } from "react";
import Card from "../Components/Card";

const Home = () => {

  const [dentists, setDentists] = useState([])

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />

    fetch('https://dhodonto.ctdprojetos.com.br/dentista').then(
      response => {
        response.json().then(
          data => {
            setDentists(data)
          }
        )
      }
    )
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">

        {
          dentists.map((dentist) => {
            return (
              // <Link to={`dentist/${dentist.matricula}`}>
                <Card containerData={dentist} key={dentist.matricula} />
                // {/* <Outlet /> */}
                // {/* </Card> */}
              // </Link>
            )
          })
        }

      </div>
    </>
  );
};

export default Home;
