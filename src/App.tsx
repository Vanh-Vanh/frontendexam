import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Calendar from './components/Calendar'
import Password from './components/Password'
import Input from './components/Input'
import Search from './components/Search'
import SearchResult from './components/SearchResult'
import Tags from './components/Tags';
import './App.css'

function App() {
  
  return (
    <Router>
      <div className="w-screen h-full bg-black text-white flex items-center justify-center">
       <Routes>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/password" element={<Password/>}/>
        <Route path="/input" element={<Input/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/search/result" element={<SearchResult />} />
        {/* <Route path="/searchresult/:keyword/:limit" element={<SearchResult />} /> */}
        <Route path="/search/tags" element={<Tags/>}/>
       </Routes>
      </div>
    </Router>
  )
}

export default App
