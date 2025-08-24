import style from "./Header.module.css"
function Header() {
  return (
    <>
      <section className={`${style.Content_section}`}>
        <center><h1>Welcome to  <b className={style.dominname}>STUDYSHARP</b> to become a sark !</h1></center>
      </section>
    </>
  )
}
export default Header;