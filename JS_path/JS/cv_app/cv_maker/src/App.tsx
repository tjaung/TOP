// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Fragment } from "react/jsx-runtime";
import "./App.css";
import Forms from "./components/Forms";
import Header from "./components/Header";
import PersonalDetails from "./components/PersonalDetails";
import ProfessionalExperience from "./components/ProfessionalExperience";
import Resume from "./components/ResumeOutput";

function App() {
  return (
    <Fragment>
    {/* <> */}
      <Header />

    {/* <div className="container">
      <div className="row"> */}
        <Forms />
        <Resume />
      {/* </div> */}
      {/* <div className="row">
        
      </div> */}
      
    {/* </div> */}
    
    </Fragment>
  );
}

export default App;
