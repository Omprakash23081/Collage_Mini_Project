import style from "./PROFILE02.module.css"
function PROFILE02() {
  return (
    <div className={style.container}>
      <div className={style.profile02}>
        <div className={style.profile02_content_icon}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
        </div>
        <div className={style.profile02_content}>
          <p>My Purchases</p>
        </div>
        <div className={style.arow}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="44px" fill="#FFFFFF"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg>
        </div>
      </div>
      <div className={style.profile02}>
        <div className="profile02_content_icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="34px" fill="#FFFFFF"><path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" /></svg>
        </div>
        <div className={style.profile02_content}>
          <p>Exam Information</p>
        </div>
        <div className={style.arow}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="44px" fill="#FFFFFF"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg>
        </div>
      </div>
      <h2>My Weekly Activity</h2>
      <div className={style.Activity_contener}>
        <div className={style.Activity_contener1}>
          <div className={style.weekly_Activity}>
            <div className="activit_icons">
              <img src="https://web.getmarks.app/icons/question-circle.svg" alt="" />
            </div>
            <div className="activity_tital">
              <p>0</p>
              <h3>Question solved</h3>
            </div>
          </div>
          <div className={style.weekly_Activity}>
            <div className="activit_icons">
              <img src="https://web.getmarks.app/icons/check-circle.svg" alt="" />
            </div>
            <div className="activity_tital">
              <p>0</p>
              <h3>Correct Questions</h3>
            </div>
          </div>
        </div>
        <div className={style.Activity_contener1}>
          <div className={style.weekly_Activity}>
            <div className="activit_icons">
              <img src="https://web.getmarks.app/icons/accuracy.svg" alt="" />
            </div>
            <div className="activity_tital">
              <p>0%</p>
              <h3>Accuracy</h3>
            </div>
          </div>
          <div className={style.weekly_Activity}>
            <div className="activit_icons">
              <img src="https://web.getmarks.app/icons/bullseye-arrow.svg" alt="" />
            </div>
            <div className="activity_tital">
              <p>0</p>
              <h3>Challenges Taken</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default PROFILE02;