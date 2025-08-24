import Printer from "./PYQ03PRINTER.jsx"
import style from "./PYQ03TOPICKWISE.module.css"


function PYQ03TOPICKWISE({ questions }) {
  return (
    <div >
      <Printer questions={questions} who={"Topic"} />
    </div>
  )
}

export default PYQ03TOPICKWISE;