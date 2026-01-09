import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import LoginPage from "./pages/Login"

function App() {
  

  return (
    <BrowserRouter>
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          


        </Routes>
    </BrowserRouter>
  )
}

export default App
