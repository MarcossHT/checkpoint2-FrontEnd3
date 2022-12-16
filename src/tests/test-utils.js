import { render } from "@testing-library/react"
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom"
import Home from "../Routes/Home"
import Detail from "../Routes/Detail"
import Login from "../Routes/Login"
import App from "../App"
import { ThemeProvider } from "../hooks/useTheme"
import { AuthProvider } from "../hooks/useAuth"


const renderWithContext = (ui, providerValue)=>{
    return render(
        <BrowserRouter>
            <ThemeProvider value={providerValue || {theme: "light", data: []}}>
                <AuthProvider value={providerValue || {auth: "", data: []}}>   
                    {ui}
                </AuthProvider>                
            </ThemeProvider>
        </BrowserRouter>
    )
}

//Only for testing individual routes as /dentist/:id
export const renderWithRouter = (ui, {route = '/', path='/'}) => {
    window.history.pushState({}, 'Test page', route)

    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route index path={path} element={ui}/>
            </Routes>
        </MemoryRouter>
    )
}

export * from "@testing-library/react"
export {renderWithContext as render}  