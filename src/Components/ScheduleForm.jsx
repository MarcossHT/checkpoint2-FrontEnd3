import { useEffect, useState } from 'react'
import { useNavigate, redirect } from 'react-router-dom'
import './ScheduleForm.module.css'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'

const ScheduleForm = () => {
  const { theme } = useTheme()
  const { auth, saveToken } = useAuth()
  const [dentistas, setDentistas] = useState([])
  const [pacientes, setPacientes] = useState([])

  const [pacienteState, setPacienteState] = useState()
  const [dentistaState, setDentistaState] = useState()
  const [data, setData] = useState('')

  const navigate = useNavigate()

  function obterDados(tipo, funcao) {
    fetch(`https://dhodonto.ctdprojetos.com.br/${tipo}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw Error('Erro interno do servidor!')
        }
      })
      .then(res => {
        if (tipo === 'dentista') {
          funcao(res)
          setDentistaState(res[0].matricula)
        } else {
          funcao(res.body)
          setPacienteState(res.body[0].matricula)
        }
      })
      .catch(erro => alert(erro))
  }

  useEffect(() => {
    obterDados('dentista', setDentistas)
    obterDados('paciente', setPacientes)
  }, [])

  const handleSubmit = event => {
    event.preventDefault()

    fetch(`https://dhodonto.ctdprojetos.com.br/consulta`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`
      },
      method: 'POST',
      body: JSON.stringify({
        paciente: {
          matricula: pacienteState
        },
        dentista: {
          matricula: dentistaState
        },
        dataHoraAgendamento: data
      })
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          return res.json()
        } else if (res.status === 400) {
          throw Error(
            'Não foi possivel marcar a consulta! tente em outro horario'
          )
        } else if (res.status === 403) {
          if (auth === '') {
            throw Error(
              'Acesso negado! Por favor logasse para pode marcar uma consulta'
            )
          } else {
            saveToken({
              state: 'auth',
              auth: ''
            })
            throw Error(
              'Acesso negado! Esta sessão está expirada! Faça login novamente...'
            )
          }
        } else {
          throw Error('Erro interno do servidor!')
        }
      })
      .then(res => {
        alert('A consulta foi marcada com sucesso')
      })
      .catch(erro => alert(erro))
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${
          theme === 'dark' ? 'cardDark' : ''
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className={`row rowSpacing`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentista
              </label>
              <select
                className="form-select"
                name="dentist"
                id="dentist"
                onChange={event => setDentistaState(event.target.value)}
              >
                {dentistas.map(dentista => {
                  if (dentista.matricula === dentistaState) {
                    return (
                      <option
                        key={dentista.matricula}
                        value={dentista.matricula}
                        select="true"
                      >
                        {`${dentista.nome} ${dentista.sobrenome}`}
                      </option>
                    )
                  } else {
                    return (
                      <option
                        key={dentista.matricula}
                        value={dentista.matricula}
                      >
                        {`${dentista.nome} ${dentista.sobrenome}`}
                      </option>
                    )
                  }
                })}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select
                className="form-select"
                name="patient"
                id="patient"
                onChange={event => setPacienteState(event.target.value)}
              >
                {pacientes.map(paciente => {
                  if (paciente.matricula === pacienteState) {
                    return (
                      <option
                        key={paciente.matricula}
                        value={paciente.matricula}
                        select="true"
                      >
                        {`${paciente.nome} ${paciente.sobrenome}`}
                      </option>
                    )
                  } else {
                    return (
                      <option
                        key={paciente.matricula}
                        value={paciente.matricula}
                      >
                        {`${paciente.nome} ${paciente.sobrenome}`}
                      </option>
                    )
                  }
                })}
              </select>
            </div>
          </div>
          <div className={`row rowSpacing`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                onChange={event => setData(event.target.value)}
                value={data}
              />
            </div>
          </div>
          <div className={`row rowSpacing`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button className={`btn btn-${theme} button`} type="submit">
              Agendar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ScheduleForm
