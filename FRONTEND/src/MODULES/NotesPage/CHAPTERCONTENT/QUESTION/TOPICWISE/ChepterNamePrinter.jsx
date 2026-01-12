import style from "./TopicWisePrinter.module.css";
function TopicWisePrinter({ chepter }) {
  if (!chepter || typeof chepter !== "object") {
    return <div>No topics available.</div>;
  }
  let i = 1;
  return (
    <>
      {chepter.map((values) => (
        <>
          <a href={values.fileUrl}>
            <div className={style.question_item} key={values}>
              <div className={style.question_text}>
                <span>
                  0{i++}{" "}
                  <span style={{ color: "#ffffff", margin: "0 8px" }}>
                    {values}
                  </span>
                </span>{" "}
              </div>
            </div>
          </a>

          <hr className={style.hr} />
        </>
      ))}
    </>
  );
}
export default TopicWisePrinter;
