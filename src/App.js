import Sidebar from "./components/Sidebar";
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Register from "./pages/Register";
import Restaurant from "./components/Restaurant";

function App() {
  return (
    <>
      <Router>
          <Header/>
          <Sidebar/>
          <div className="container"> 
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/search/yoursearch' element={<SearchResults/>}/>
          </Routes>
          </div>
      </Router>
    </>
  );
}

export default App;
