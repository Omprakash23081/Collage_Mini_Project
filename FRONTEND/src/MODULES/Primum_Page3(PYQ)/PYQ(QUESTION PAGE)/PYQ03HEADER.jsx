import style from "./PYQ03HEADERS.module.css";

function PYQ03HEADERS({ set, currentsubject }) {
  return (
    <header className={style.header}>
      <button className={style.back_button} onClick={() => set(["first"])}>
        {/* Simple arrow icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      <div className={style.header_content}>
        <h1 className={style.header_title}>{currentsubject || "Chapter Name"}</h1>
        <div className={style.header_subtitle}>
            High Output High Input
        </div>
      </div>

      <div className={style.header_actions}>
        <button className={style.action_item}>
          <div className={style.icon_box}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span className={style.action_label}>Note</span>
        </button>

        <button className={style.action_item}>
          <div className={style.icon_box}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span className={style.action_label}>Bookmark</span>
        </button>

        <button className={style.action_item}>
          <div className={style.icon_box}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </div>
          <span className={style.action_label}>Analysis</span>
        </button>
      </div>
    </header>
  );
}

export default PYQ03HEADERS;
