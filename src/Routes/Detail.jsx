import DetailCard from '../Components/DetailCard'
import { useParams } from 'react-router-dom'

const Detail = () => {
  const { matricula } = useParams()

  return (
    <>
      <DetailCard matricula={matricula} />
    </>
  )
}

export default Detail
