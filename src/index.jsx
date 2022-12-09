import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import Footer from "./Components/Footer";
import App from "./App";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui
const routerApp = createBrowserRouter([
  
      {
        path: '',
        element: <Navigate to='home'/>
      }, 
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'Login',
        element: <Login />
      },
      {
        path: 'detail/:id',
        element: <Detail />
      },
  
 
])

root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router = {routerApp}/>
    <Footer />
  </React.StrictMode>
);
