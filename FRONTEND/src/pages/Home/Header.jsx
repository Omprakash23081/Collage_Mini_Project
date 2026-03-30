import style from "./Header.module.css"
function Header() {
  return (
    <>
      <section className={`${style.Content_section}`}>
        <h1>Welcome to <span className={style.dominname}>STUDYSHARP</span> to become a shark!</h1>
      </section>
    </>
  )
}
export default Header;