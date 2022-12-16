import { render, screen } from "../../test-utils"
import Login from '../../../Routes/Login';
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

test('should show login form', () => {
  render(<Login />)
  expect(screen.getByText('Login')).toBeInTheDocument();
});


test('Se o componente Navbar foi Renderizado (1)', async () => {
    render(<Navbar />)
    expect(screen.getByText('Login')).toBeInTheDocument()
})

test('Se o componente Navbar foi Renderizado (2)', async () => {
    render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
})

test('Se o componente Navbar foi Renderizado (3)', async () => {
  render(<Navbar />)
  expect(screen.getByRole('banner')).toHaveTextContent('DH Odonto')
})

test('Se o componente Footer foi Renderizado', async () => {
  render(<Footer />)
  expect(screen.getByRole('contentinfo')).toHaveTextContent('Voltar para o topo')
})