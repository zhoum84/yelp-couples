import Sidebar from "./components/Sidebar";
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Register from "./pages/Register";
import Restaurant from "./components/Restaurant";
import FormPage from "./pages/FormPage";
import List from "./pages/List";
import Navbar from "./components/Navbar";
import Group from "./pages/Groups";

function App() {
  return (
    <>
      <Router>
          {/* <Header/> */}
          <Navbar/>
          {/* <Sidebar/> */}
          <div className="container"> 
          <Routes>

            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/form' element={<FormPage/>}/>
            <Route path='/group' element={<Group/>}/>

            <Route path='/search/:item' element={<SearchResults/>}/>
            <Route path='/list/:user_id/:group_id' element={<List />} />
          </Routes>
          </div>

      </Router>
    </>
  );
}

export default App;
