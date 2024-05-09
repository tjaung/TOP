import { useState } from "react"
import CustomInput from "./CustomInput";


interface PersonProps {
    firstName: string,
    lastName: string,
    age: number
  }
  
  function Person({ firstName, lastName, age}: PersonProps) {
    const [person, setPerson] = useState({ firstName: firstName, lastName: lastName, age: age });
    const [person, setFirstName] = useState({ firstName: firstName, lastName: lastName, age: age });
    const [person, setLastName] = useState({ firstName: firstName, lastName: lastName, age: age });
    
    const handleIncreaseAge = () => {
      console.log("in handleIncreaseAge (before setPerson call): ", person);
      setPerson((prevPerson: PersonProps) => ({ ...prevPerson, age: prevPerson.age + 1 }));
      // we've called setPerson, surely person has updated?
      console.log("in handleIncreaseAge (after setPerson call): ", person);
    };
  
    console.log("during render: ", person);

    const handleFirstName = () => {
        setFirstName((prevPerson: PersonProps) => ({...prevPerson, firstName: e.value}))
    }
    const handleLastName = (newName: string) => {
        setLastName((prevPerson: PersonProps) => ({...prevPerson, lastName: newName}))
    }

  
    return (
      <>
      <CustomInput
        onChange={(event)=> handleFirstName(event.target.value)}
        />
        <h1>{person.firstName} {person.lastName}</h1>
        <h2>{person.age}</h2>
        <button onClick={handleIncreaseAge}>Increase age</button>
        <CustomInput
        onChange={(event)=> handleFirstName(event.target.value)}
        />
        </>
    );
  }
  
  export default Person