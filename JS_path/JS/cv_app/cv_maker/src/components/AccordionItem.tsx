import { ReactNode } from "react"

interface interfaceAccordionItem {
    form: ReactNode
    title: string
    classNumber: string
}

function AccordionItem( { form, title, classNumber }: interfaceAccordionItem) {

    let classPrefix = 'flush-collapse'
    let classNumberName = classPrefix + classNumber
    const classNumberNameID = '#' + classNumberName

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={classNumberNameID} aria-expanded="false" aria-controls={classNumberName}>
                    {title}
                </button>
            </h2>
            <div id={classNumberName} className="accordion-collapse collapse show" data-bs-parent={classNumberNameID}>
                {form}
            </div>
        </div>
    )
}

export default AccordionItem;