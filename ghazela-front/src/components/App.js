import React from "react";
import './App.css';
import {  BrowserRouter,
  Routes,
  Route,} from "react-router-dom";
import Header from "./Header";
import AddFormation from "./AddFormation";
import EditFormation from "./EditFormation";
import FormationsList from "./FormationsList";
import Planning from "./Planning";


function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormationsList />} />
      <Route path="/add" element={<AddFormation />} />
      <Route path="/edit/:id" element={<EditFormation />} />
      <Route path="/planning" element={<Planning />} />
        </Routes>
        </BrowserRouter>
     
   </div>
  );
}

export default App;
