import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import QuestionsPage from './QuestionsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
