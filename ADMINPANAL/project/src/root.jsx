import { useState, useContext } from "react";

function root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLogin } = useContext(AppContext);
  const { loading } = useContext(AppContext);
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex">
        {isLogin && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <div className="flex-1 flex flex-col">
          {isLogin && <Header onMenuClick={() => setSidebarOpen(true)} />}
        </div>
      </div>
    </>
  );
}

export default root;
