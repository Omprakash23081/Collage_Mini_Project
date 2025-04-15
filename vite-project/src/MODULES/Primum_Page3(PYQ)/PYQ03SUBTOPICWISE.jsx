import Printer from "./PYQ03PRINTER.jsx"



function PYQ03SUBTOPICWISE({ Topic, set1 }) {
  return (
    <>
      <Printer questions={Topic} who={"PYQ03SUBTOPICWISE"} set1={set1} />
    </>
  )
}
export default PYQ03SUBTOPICWISE;