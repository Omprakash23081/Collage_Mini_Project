// import style from "./PYQ03PRINTER.module.css";
// import { useContext } from "react";

// function PYQPRINTER({ showMenu, handleMenuChange, currentsubject }) {
//   function pyqrender(value) {
//     handleMenuChange(value);
//   }

//   //this will filter only those object witch will match with click subject on witch user click

//   if (showMenu === "All") {
//     questions = questions?.filter((obj) => {
//       switch (currentfilter.trim().toLowerCase()) {
//         case "all":
//           return true;
//         case "important":
//           return obj.tag?.toLowerCase() === "important";
//         case "most important":
//           return obj.tag?.toLowerCase() === "most important";
//         default:
//           return true;
//       }
//     });
//   }
//   let i = 1;
//   return (
//     <>
//       {showMenu === "All" && (
//         <PYQ03MANUE
//           currentfilter={currentfilter}
//           setcurrentfilter={setcurrentfilter}
//         />
//       )}
//       {questions.map((key) => (
//         <>
//           {/* //this is for sub topick wise when i click on paticiluar topic */}
//           {/* {who === "Topic" && (
//             <>
//               {key.tag === "important" && (
//                 <>
//                   <div className={style.question_item} key={key._id}>
//                     <div className={style.question_text}>
//                       <span>
//                         0{i++} {key.question}
//                       </span>{" "}
//                     </div>
//                     <div className={style.question_meta}>
//                       {key.years.join(", ")}
//                     </div>
//                   </div>
//                   <hr className={style.hr} />
//                 </>
//               )}
//             </>
//           )} */}
//           {/* //tthis is for sub topic wise when i click on sub topic nav bar */}
//           {/* {who === "PYQ03SUBTOPICWISE" && (
//             <>
//               <div
//                 className={style.question_item_topic}
//                 key={key}
//                 onClick={() => pyqrender(["Topic", key.topic])}
//               >
//                 <div className={style.question_text}>
//                   <span>
//                     0{i++} {key.topic}
//                   </span>{" "}
//                 </div>
//                 <div className={style.question_meta}>
//                   {key.TotalQS} Questions
//                 </div>
//               </div>
//               <hr className={style.hr} />
//             </>
//           )} */}
//           {/* //this is for all question when i click on all question nav bar */}
//           {/* {who === "All" && ( */}
//           <>
//             <div
//               className={style.question_item}
//               key={key._id}
//               onClick={() =>
//                 pyqrender(["", "Q" + key.questionNumber + "  " + key.question])
//               }
//             >
//               <div className={style.question_text}>
//                 <span>
//                   0{key.questionNumber} {key.question}
//                 </span>{" "}
//               </div>
//               <div className={style.question_meta}>{key.years.join(", ")}</div>
//             </div>
//             <hr className={style.hr} />
//           </>
//           {/* )} */}
//         </>
//       ))}
//     </>
//   );
// }
// export default PYQPRINTER;
