import Printer from "./PYQ03PRINTER.jsx";

function PYQ03SUBTOPICWISE({ Topic, handleMenuChange }) {
  return (
    <>
      <Printer
        questions={Topic}
        handleMenuChange={handleMenuChange}
        who={"PYQ03SUBTOPICWISE"}
      />
    </>
  );
}
export default PYQ03SUBTOPICWISE;
