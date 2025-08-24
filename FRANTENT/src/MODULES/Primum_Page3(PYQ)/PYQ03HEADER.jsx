import style from "./PYQ03HEADERS.module.css";

function PYQ03HEADERS({ count, set, currentsubject, question }) {
  return (
    <header className={style.header}>
      <a
        href="#"
        className={style.back_button}
        onClick={(event) => set(["second"])}
      >
        ←
      </a>
      <div className={style.header_content}>
        <h1 className={style.header_title}>
          {" "}
          {question ? question : currentsubject}
        </h1>
        <div className={style.header_subtitle}>
          {question ? " " : "All Questions"} | {currentsubject} |{" "}
          {/* 0{count.current} Qs | High Output High Input */}
        </div>
      </div>
      <div className={style.header_icons}>
        <div className={style.header_icon}>
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 5.75L18.75 8.75M20.25 11.75V20C20.25 20.1989 20.171 20.3897 20.0303 20.5303C19.8897 20.671 19.6989 20.75 19.5 20.75H4.5C4.30109 20.75 4.11032 20.671 3.96967 20.5303C3.82902 20.3897 3.75 20.1989 3.75 20V5C3.75 4.80109 3.82902 4.61032 3.96967 4.46967C4.11032 4.32902 4.30109 4.25 4.5 4.25H12.75M12 15.5H9V12.5L18 3.5L21 6.5L12 15.5Z"
                stroke="#B9BFD0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <h3>
              <center>Note</center>
            </h3>
          </span>
        </div>
        <div className={style.header_icon}>
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M6.75147 2.75L6.7375 2.76398H6.66803C5.89412 2.76398 5.15191 3.07141 4.60467 3.61865C4.05743 4.16589 3.75 4.9081 3.75 5.68201L3.75002 21.5C3.75002 21.6989 3.82904 21.8897 3.96969 22.0303C4.11034 22.171 4.30111 22.25 4.50002 22.25H18C18.4142 22.25 18.75 21.9142 18.75 21.5C18.75 21.0858 18.4142 20.75 18 20.75H5.25002V20.7329C5.25101 20.5409 5.28911 20.3507 5.36227 20.1731C5.43721 19.9911 5.54743 19.8257 5.68659 19.6866C5.82576 19.5474 5.9911 19.4372 6.17308 19.3623C6.35506 19.2873 6.55007 19.2492 6.74688 19.25L6.75002 19.25H19.5C19.9142 19.25 20.25 18.9142 20.25 18.5V3.5C20.25 3.08579 19.9142 2.75 19.5 2.75H6.75147ZM5.60196 17.9752C5.48073 18.0251 5.36318 18.0829 5.25002 18.1479L5.25003 5.75L5.25001 5.74686C5.24919 5.55005 5.28734 5.35504 5.36227 5.17306C5.43721 4.99108 5.54743 4.82574 5.68659 4.68657C5.82576 4.54741 5.9911 4.43719 6.17308 4.36225C6.35506 4.28732 6.55007 4.24917 6.74688 4.25H9.75002V12.5C9.75002 12.7841 9.91052 13.0438 10.1646 13.1708C10.4187 13.2979 10.7228 13.2704 10.95 13.1L13.5 11.1875L16.05 13.1C16.2773 13.2704 16.5813 13.2979 16.8354 13.1708C17.0895 13.0438 17.25 12.7841 17.25 12.5V4.25H18.75V17.75H6.75146H6.75002V18.5L6.75316 17.75L6.75146 17.75C6.3572 17.7486 5.96654 17.8251 5.60196 17.9752ZM18.75 17.75H19.5V18.5H18.75V17.75ZM18.75 4.25V3.5H19.5V4.25H18.75ZM11.25 11V4.25H15.75V11L13.95 9.65C13.6834 9.45 13.3167 9.45 13.05 9.65L11.25 11Z"
                fill="#B9BFD0"
              ></path>
              <path
                d="M19.5 17.75H18.75V18.5H19.5V17.75Z"
                fill="#B9BFD0"
              ></path>
              <path d="M18.75 3.5V4.25H19.5V3.5H18.75Z" fill="#B9BFD0"></path>
            </svg>
          </span>
          <h3>
            <center>Bookmark</center>
          </h3>
        </div>
        <div className={style.header_icon}>
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 20.5V15.5"
                stroke="#B9BFD0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9 20.5V10.5"
                stroke="#B9BFD0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M15 20.5L15 12.5"
                stroke="#B9BFD0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20 20.5L20 4.5"
                stroke="#B9BFD0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
          <h3>
            <center>Analysis</center>
          </h3>
        </div>
      </div>
    </header>
  );
}

export default PYQ03HEADERS;
