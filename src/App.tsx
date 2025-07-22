import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Calendar from './components/Calendar'
import Password from './components/Password'

function App() {
  return (
    <Router>
      <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
       <Routes>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/password" element={<Password/>}/>
       </Routes>
      </div>
    </Router>
  )
}

export default App
