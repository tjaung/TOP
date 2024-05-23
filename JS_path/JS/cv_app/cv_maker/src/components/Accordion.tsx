import AccordionItem from "./AccordionItem"
import PersonalDetails from "./PersonalDetails"
import ProfessionalExperience from "./ProfessionalExperience"

function Accordion() {
  const forms = [<PersonalDetails/>, <ProfessionalExperience />]

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">

        {/* do an array map of accordion items:
        array.map((accordionItem) => {
          accordionItem into accordion item component
        }) */}

      
      <AccordionItem 
        form={<PersonalDetails />}
        title='Personal Detauls'
        classNumber="One"
      />
      <AccordionItem 
        form={<ProfessionalExperience />}
        title='Professional Experience'
        classNumber="Two"
      />
        
    </div>
  )
}

export default Accordion