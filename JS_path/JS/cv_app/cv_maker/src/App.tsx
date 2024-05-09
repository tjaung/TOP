// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Header from "./components/Header";
import PersonalDetails from "./components/PersonalDetails";
import ProfessionalExperience from "./components/ProfessionalExperience";

function App() {
  return (
    <>
      <Header />
      <PersonalDetails />
      <ProfessionalExperience />
    </>
  );
}

export default App;
