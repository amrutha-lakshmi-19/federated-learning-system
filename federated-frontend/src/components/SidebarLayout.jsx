import { Link, useLocation } from "react-router-dom";
import { FaNetworkWired } from "react-icons/fa";
import { useState, useRef } from "react";

export default function SidebarLayout({ children }) {
  const location = useLocation();
  const [width, setWidth] = useState(323);
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Client 1", path: "/client/client1" },
    { name: "Client 2", path: "/client/client2" },
    { name: "Client 3", path: "/client/client3" },
  ];

  // Toggle Sidebar
  const toggleSidebar = () => {
    if (collapsed) {
      setWidth(260);
    } else {
      setWidth(90);
    }
    setCollapsed(!collapsed);
  };

  // Resizing Logic
  const startResizing = (e) => {
    if (collapsed) return;

    const startX = e.clientX;
    const startWidth = width;

    const doDrag = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth > 220 && newWidth < 500) {
        setWidth(newWidth);
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        style={{ width }}
        className="bg-black flex flex-col p-8 relative text-white transition-all duration-300"
      >
        {/* Logo + Toggle Row */}
        <div className="flex items-center justify-between mb-12">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <FaNetworkWired className="text-emerald-400 text-2xl" />
              <span className="text-2xl font-heading font-semibold text-white">
                FedLearn
              </span>
            </Link>
          )}

          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none hover:text-emerald-400 transition"
          >
            ☰
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 font-body">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 rounded-xl text-base transition ${
                location.pathname === item.path
                  ? "bg-gray-800 text-white font-semibold"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {collapsed ? item.name.charAt(0) : item.name}
            </Link>
          ))}
        </nav>

        {/* Drag Handle */}
        {!collapsed && (
          <div
            onMouseDown={startResizing}
            className="absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-gray-700 transition"
          />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="relative flex items-center p-6 bg-white">
          
          {/* Centered Title */}
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-emerald-700">
            Distributed Hierarchical Architecture
          </h1>

          {/* Back Button */}
          <div className="ml-auto">
            <Link
              to="/"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>

      </div>
    </div>
  );
}