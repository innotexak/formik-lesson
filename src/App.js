import React, {useState, useEffect} from 'react'
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Register";
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {


  const [data, setData] = useState([])



  useEffect(()=>{
      const fetch  = async ()=>{
       try {
          const  response =  await axios.get("https://jsonplaceholder.typicode.com/photos")
          if(response.status === 200){
              setData(response.data)
          }
       } catch (error) {
          console.log(error);
       }
      }

  fetch()
  },[])
  return (
    <Router>
        <Routes>
          <Route exact path="" element={<Home data={data}/>} />
          <Route exact path="/login" element={<Login im={data}/>}/>
          <Route exact path="register" element={<Signup/>}/>
        </Routes>
    </Router>
  
  );
}

export default App;
